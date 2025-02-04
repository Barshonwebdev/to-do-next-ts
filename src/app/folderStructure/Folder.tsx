import "@ant-design/v5-patch-for-react-19";

export default function FolderComponent({
  children,
  deleteFolderfunc,
  showModal,
  parentId,
}) {
  // const [children, setChildren] = useState<Folder[]>([]);
  //const[parentId,setParentId]=useState<null | String>(null);
  console.log(children);
  return (
    <div>
      <div>
        {children.map((child) => ( 
          <div key={child._id} className="flex items-center justify-between">
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
              onClick={() => showModal()}
              className="rounded-lg bg-green-500 px-1 py-1 text-xs font-bold text-white"
            >
              New +
            </button>
           <div className="mx-5 my-5 ">
           {child.parentId !== null ? (
              <FolderComponent
                deleteFolderfunc={() => deleteFolderfunc(child?._id)}
                showModal={showModal}
                children={child}
                parentId={child._id}
              ></FolderComponent>
            ) : (
              <div>root</div>
            )}
           </div>
          </div>
        ))}
      </div>
    </div>
  );
}
