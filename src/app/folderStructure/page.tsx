"use client";

import { Modal } from "antd";
import { useEffect, useState } from "react";
import "@ant-design/v5-patch-for-react-19";
import { postFolder, readFolders } from "./action";

type TCreateFolder= {
    name:string,
    
}

export default function folderStructure() {
  const [children, setChildren] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
      async function fetchTasks() {
        // server action
        const data = await readFolders();
        setChildren(data);
      }
      fetchTasks();
    }, []);
  
  
    async function addFolder(folder: TCreateFolder) {
        // server action
        await postFolder(folder);
        setFolderName('');
        // server action
        const data = await readFolders();
        setChildren(data);
      };
      const handleAddFolder=()=>{
        if (folderName.trim() === "") return;
        const newFolder = {
          name: folderName,
        };
        addFolder(newFolder);
        setIsModalOpen(false);
      }

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1 className="my-4 text-center text-3xl text-indigo-500">
        Folder Structure Viewer
      </h1>
      <div className="mx-96 rounded-xl bg-gray-100 p-5">
        <div className="flex items-center justify-between">
          <p>root</p>
          <button
            onClick={() => showModal()}
            className="rounded-lg bg-green-500 px-1 py-1 text-xs font-bold text-white"
          >
            New +
          </button>
        </div>
        <div className="mx-10 my-3">
          
            {
                children.map(child=>(
                    <div key={child._id}>
                        <p>{child.name}</p>
                    </div>
                 ) )
            }
        
        </div>
      </div>
      {/* modal  */}
      <>
        <Modal
          title="Create Folder"
          open={isModalOpen}
          onOk={handleAddFolder}
          onCancel={() => {setIsModalOpen(false)

        setFolderName('');
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
