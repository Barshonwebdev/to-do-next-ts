"use client";

import { Modal } from "antd";
import { useEffect, useState } from "react";
import "@ant-design/v5-patch-for-react-19";
import { deleteFolder, postFolder, readFolders } from "./action";
import FolderComponent from "./Folder";

type Folder = {
  _id: string;
  name: string;
  parentId: string | null;
};
type TCreateFolder = {
  name: string;
  parentId: string | null;
};

export default function folderStructure() {
  const [allFolders, setAllFolders] = useState<Folder[]>([]);
  const [clicked, setClicked] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [root, setRoot] = useState();

  useEffect(() => {
    async function fetchFolders() {
      // server action
      const data = await readFolders();
      setAllFolders(data);
      //console.log(data);
      setRoot(data.find((child) => !child.parentId));
      console.log(root);
    }
    fetchFolders();
  }, []);
  //console.log(allFolders);

  async function addFolder(folder: TCreateFolder) {
    // server action
    await postFolder(folder);
    setFolderName("");
    // server action
    const data = await readFolders();
    setAllFolders(data);
  }
  const handleAddFolder = () => {
    if (folderName.trim() === "") return;
    const newFolder = {
      name: folderName,
      parentId: root?._id,
    };
    addFolder(newFolder);
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  async function deleteFolderfunc(id: string | null) {
    await deleteFolder(id);

    const data = await readFolders();
    setAllFolders(data);
  }

  return (
    <div>
      <h1 className="my-4 text-center text-3xl text-indigo-500">
        Folder Structure Viewer
      </h1>

      <div className="mx-96 rounded-xl bg-gray-100 p-5">
        {root ? (
          <FolderComponent
            deleteFolderfunc={deleteFolderfunc}
            showModal={showModal}
            children={allFolders}
            parent={root}
          />
        ) : null}
      </div>
      {/* modal  */}
      <>
        <Modal
          title="Create Folder"
          open={isModalOpen}
          onOk={handleAddFolder}
          onCancel={() => {
            setIsModalOpen(false);
            setFolderName("");
          }}
        >
          <input
            placeholder="Folder Name"
            onChange={(e) => setFolderName(e.target.value)}
            value={folderName}
            className="border-gray border-2 px-4 sm:mx-auto md:mx-0"
            type="text"
          />
        </Modal>
      </>
    </div>
  );
}
