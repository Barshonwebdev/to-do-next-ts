'use client';

import React, { useEffect, useState } from "react";


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

  async function editTask(id){
    await fetch(`/api/${id}`,{
      method:"PUT",
      body:JSON.stringify(userInput),
    })
  }

  async function addTask(list,item){
    await fetch('/api',{
      method:"POST",
      body:JSON.stringify(item)
    })
    setList([...list, item]);

  }
  //add task or edit task
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
      addTask(list,newItem);
      
  } 
  
    setUserInput(' ');
    
};

   async function deleteTask (id) {
     await fetch(`/api/${id}`,{
       method:"DELETE", 
     }
);
      const updatedList = list.filter((item) => item._id !== id);
      setList(updatedList); 
  };

  const startEdit = (item) => {
    setUserInput(item.value);
    setEditItem(item); 
};
  
  return (
    <div className="bg-gray-100 flex flex-col justify-center py-8 w-1/2 mx-auto" >
      <h1 className= " text-center text-5xl mt-5">To Do App</h1>
      <div className="  flex flex-col md:flex-row space-y-3 justify-center mt-8 space-x-2">
        <input  onChange={(e)=> updateInput(e.target.value)} value={userInput} className="sm:mx-auto md:mx-0  border-gray border-2" type="text" />
        <button onClick={()=>handleAddorEdit(editItem?._id)} className="bg-blue-500 text-white px-2 py-1 hover:bg-green-500">{editItem !== null ? 'Update task' : 'Add task'}</button>
        
      </div>
      <div className="  mt-5 ">
         <div className=" flex flex-col justify-center items-center"  >
         {
            list.map((item,index)=>(
            <div className=" flex flex-col " key={index}>
              <div className="text-center">
            <span className=" text-green-500 font-bold text-2xl">{item.value}</span>
              </div>
              <div className="space-x-2 flex justify-center items-center">
              <span><button  onClick={() => deleteTask(item._id)} className="p-1 text-white bg-red-500 rounded">Delete</button></span>
              <span><button  onClick={() => startEdit(item)} className="p-1 text-white bg-orange-500 rounded">Edit</button></span>
              </div>
            </div>
            ))
          }
         </div>
        </div>
    </div>
  );
}
