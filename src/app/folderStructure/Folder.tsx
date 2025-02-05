import "@ant-design/v5-patch-for-react-19";
import Swal from "sweetalert2";

export default function FolderComponent({
  children,
  deleteFolderfunc,
  showModal,
  parent,
}) {
  // const [children, setChildren] = useState<Folder[]>([]);
  //const[parentId,setParentId]=useState<null | String>(null);

  const filteredChildrenFolders = children.filter(
    (child) => child?.parentId === parent?._id,
  );
  //console.log(filteredChildrenFolders);

  return (
    <div className="">
      {!parent?.parentId ? (
        <div className="flex space-x-2">
          <div className="flex space-x-2">
            <p>{parent.name}</p>
            <button
              onClick={() => {Swal.fire("Root directory deletion is prohibited!");}}
              className="rounded-lg bg-red-500 px-1 py-1 text-xs font-bold text-white"
            >
              Remove
            </button>
          </div>
          <button
            onClick={()=>showModal(parent?.id)}
            className="rounded-lg bg-green-500 px-1 py-1 text-xs font-bold text-white"
          >
            New +
          </button>
        </div>
      ) : null}

      <div className="mt-5 ms-20">
        {filteredChildrenFolders?.map((child) => (
          <div
            key={child?._id}
            className="items-center justify-between space-y-5"
          >
            <div className=" ">
              <div className="flex space-x-2">
                <p>{child.name}</p>
                <button
                  onClick={() => deleteFolderfunc(child?._id)}
                  className="rounded-lg bg-red-500 px-1 py-1 text-xs font-bold text-white"
                >
                  Remove
                </button>
                <button
                  onClick={() => {
                    showModal(child?._id);
                  }}
                  className="rounded-lg bg-green-500 px-1 py-1 text-xs font-bold text-white"
                >
                  New +
                </button>
              </div>
            </div>
            <div className="mx-5 my-5">
              <FolderComponent
                deleteFolderfunc={deleteFolderfunc}
                showModal={showModal}
                children={children}
                parent={child}
              ></FolderComponent>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
