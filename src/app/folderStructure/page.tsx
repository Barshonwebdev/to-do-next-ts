"use client";

import { useState } from "react";

export default function folderStructure() {
    const [children,setChildren]=useState([]);
    const [clicked,setClicked]=useState(false);
    const [folderName,setFolderName]=useState('');


  return <div>
    <h1 className="text-center text-3xl text-indigo-500 my-4">Folder Structure Viewer</h1>
        <div className="bg-gray-100 mx-96 p-5 rounded-xl">
            <p>root</p>
            <div className="mx-10 my-3">{children.map(children=>(
                <div>
                    {children} 
                </div>)
            )}</div>
        </div>
    </div>;
}
