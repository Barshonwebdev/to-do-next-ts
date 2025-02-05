import "@ant-design/v5-patch-for-react-19";

export default function FolderComponent({
  children,
  deleteFolderfunc,
  showModal,
  parent,
}) {
  // const [children, setChildren] = useState<Folder[]>([]);
  //const[parentId,setParentId]=useState<null | String>(null);
  console.log({ parent });
  const filteredChildrenFolders = children.filter(
    (child) => child?.parentId === parent._id,
  );
  console.log(filteredChildrenFolders);
  return (
    <div className="">
      {!parent?.parentId ? (
        <div className="flex space-x-2">
          <div className="flex space-x-2">
            <p>{parent.name}</p>
            <button
              onClick={() => deleteFolderfunc(parent?._id)}
              className="rounded-lg bg-red-500 px-1 py-1 text-xs font-bold text-white"
            >
              Remove
            </button>
          </div>
          <button
            onClick={showModal}
            className="rounded-lg bg-green-500 px-1 py-1 text-xs font-bold text-white"
          >
            New +
          </button>
        </div>
      ) : null}

      <div className="mt-5">
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
                  onClick={showModal}
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
                children={filteredChildrenFolders}
                parent={child}
              ></FolderComponent>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
