'use client';

import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
export default  function Todo() {
  const [userInput,setUserInput]=useState('');
  const [list,setList]=useState([]);
  const [editItem,setEditItem]=useState(null);
  
  useEffect(()=>{
    async function fetchTasks() {
      const res= await fetch('http://localhost:3000/api');
      const data= await res.json();
      setList(data);
    }
    fetchTasks();
  },[])

  //setting user input 
  const updateInput=(value)=>{
    setUserInput(value);
  }

  // edit task function 
  async function editTask(id){
    await fetch(`/api/${id}`,{
      method:"PUT",
      body:JSON.stringify(userInput),
    })
    const res= await fetch('http://localhost:3000/api');
    const data= await res.json();
    setList(data);
  }

  // add task function 
  async function addTask(item){
    await fetch('/api',{
      method:"POST",
      body:JSON.stringify(item)
    })
    const res= await fetch('http://localhost:3000/api');
    const data= await res.json();
    setList(data);

  }

  //Add or Edit handling function
  const handleAddorEdit=(id)=>{
    if (userInput.trim() === '') return;
    if (editItem !== null) {
      // Edit existing item
      const updatedList = list.map((item) =>
          item._id === editItem._id ? { ...item, value: userInput } : item
      );
      setList(updatedList);
      setEditItem(editItem); // Reset edit mode 
      editTask(id);
    
  } else {
      // Add new item
      const newItem = {
          value: userInput,
      };
      addTask(newItem); 
  } 
    setUserInput(' ');
};

  // Delete task function 
   async function deleteTask (id) {
     await fetch(`/api/${id}`,{
       method:"DELETE", 
     }
);
    const res= await fetch('http://localhost:3000/api');
    const data= await res.json();
    setList(data);
  };

  // Editing function 
  const startEdit = (item) => {
    setUserInput(item.value);
    setEditItem(item); 
};
  
  return (
    <div className="bg-gray-100 flex flex-col justify-center py-8 w-1/2 mx-auto" >
      <h1 className= " text-center text-5xl mt-5">To Do App</h1>
      <div className="  flex flex-col md:flex-row mx-auto space-y-3 justify-center w-1/2 mt-8 space-x-2 ">
        <input placeholder="Add what you wanna do..." onChange={(e)=> updateInput(e.target.value)} value={userInput} className="sm:mx-auto md:mx-0  border-gray border-2 px-4" type="text" />
        <button onClick={()=>handleAddorEdit(editItem?._id)} className="bg-blue-500 rounded-lg text-white px-4 py-1 hover:bg-green-500">{editItem !== null ? 'Update task' : 'Add task'}</button>
      </div>
      <div className="  mt-5 ">
        <h1 className="text-center text-gray-400 mb-3 text-lg">To Do List</h1>
         <div className=" flex flex-col justify-center items-center space-y-3"  >
         {
            list.map((item)=>(
            <div className=" flex flex-col space-y-2 " key={item._id}>
              <div className="text-center">
            <span className=" text-green-500 font-bold text-2xl">{item.value}</span>
              </div>
              <div className="space-x-2 flex justify-center items-center">
              <span className=" "><button  onClick={() => deleteTask(item._id)} className="flex items-center p-1 text-white bg-red-500 rounded "><RxCross2></RxCross2>Delete</button></span>
              <span><button  onClick={() => startEdit(item)} className="flex items-center py-1 px-2 text-white bg-orange-500 rounded"><CiEdit></CiEdit>Edit</button></span>
              </div>
            </div>
            ))
          }
         </div>
        </div>
    </div>
  );
}
