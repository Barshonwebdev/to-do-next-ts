import { useEffect, useState } from "react";
import "@ant-design/v5-patch-for-react-19";
import { readFolders } from "./action";


type Folder = {
    _id: string;
    name: string;
    parentId: string;
  };
export  default  function FolderComponent({folder,deleteFolderfunc,showModal,parentId}) {
  
  const [children, setChildren] = useState<Folder[]>([]);
  //const[parentId,setParentId]=useState<null | String>(null);
  useEffect(() => {
    async function fetchFolders() {
      // server action
      const data = await readFolders();
      setChildren(data);
    }
    fetchFolders();
  }, []);

  return (
    <div className="mx-10 my-3">
        <div
          className="flex items-center justify-between space-y-3"
        >
          <div className="flex space-x-1">
            <p>{folder?.name}</p>
            <p>{folder?.parentId}</p>
            <button
              onClick={() => deleteFolderfunc(folder?._id)}
              className="rounded-lg bg-red-500 px-1 py-1 text-xs font-bold text-white"
            >
              Remove
            </button>
          </div>

          <button
            onClick={() => showModal()}
            className="rounded-lg bg-green-500 px-1 py-1 text-xs font-bold text-white"
          >
            New +
          </button>
        </div>
      {parentId!== null && children?.map((child) => (
        <div key={child._id}>
          <FolderComponent folder={folder} parentId={child._id}/>
        </div>
        
      ))}
    </div>
  );
}
