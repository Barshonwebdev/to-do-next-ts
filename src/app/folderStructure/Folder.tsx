import "@ant-design/v5-patch-for-react-19";

export default function FolderComponent({
  children,
  deleteFolderfunc,
  showModal,
  parent,
}) {
  // const [children, setChildren] = useState<Folder[]>([]);
  //const[parentId,setParentId]=useState<null | String>(null);
  console.log(parent);
  const filtered = children.filter((child) => child?.parentId === parent._id);

  return (
    <div>
      {!parent?.parentId ? (
        <>
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
        </>
      ) : null}

      <div>
        {filtered?.map((child) => (
          <div key={child?._id} className="flex items-center justify-between">
            <div className="flex space-x-2">
              <p>{child.name}</p>
              <button
                onClick={() => deleteFolderfunc(child?._id)}
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
