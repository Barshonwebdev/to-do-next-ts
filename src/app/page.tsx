'use client';

import React, { useState } from "react";


export default function Todo() {
  const [userInput,setUserInput]=useState('');
  const [list,setList]=useState([]);
  const [editIndex,setEditIndex]=useState(null);
  //setting user input 
  const updateInput=(value)=>{
    setUserInput(value);
  }

  //add task or edit task
  const handleAddorEdit=()=>{
    if (userInput.trim() === '') return;
    if (editIndex !== null) {
      // Edit existing item
      const updatedList = list.map((item, index) =>
          index === editIndex ? { ...item, value: userInput } : item
      );
      setList(updatedList);
      setEditIndex(null); // Reset edit mode
  } else {
      // Add new item
      const newItem = {
          id: Math.random(), // Consider using a more reliable ID generator
          value: userInput,
      };
      setList([...list, newItem]);
  }
    setUserInput(' ');
};
    const deleteItem = (id) => {
      const updatedList = list.filter((item) => item.id !== id);
      setList(updatedList);
  };

  const startEdit = (index) => {
    setUserInput(list[index].value);
    setEditIndex(index); // Set the index of the item to be edited
};
  
  return (
    <div className="bg-white" >
      <h1 className= " text-center text-5xl mt-5">To Do App</h1>
      <div className="flex justify-center mt-8 space-x-2">
        <input  onChange={(e)=> updateInput(e.target.value)} value={userInput} className="p-1 border border-gray border-2" type="text" />
        <button onClick={handleAddorEdit} className="bg-blue-500 text-white px-2 py-1 hover:bg-green-500">{editIndex !== null ? 'Update task' : 'Add task'}</button>
        
      </div>
      <div className="text-center mt-5">
          {
            list.map((item,index)=>(
            <div className="space-x-2" key={item.id}>
              <span className=" text-green-500 text-2xl">{item.value}</span>
              <span><button  onClick={() => deleteItem(item.id)} className="p-1 text-white bg-red-500 rounded">Delete</button></span>
              <span><button  onClick={() => startEdit(index)} className="p-1 text-white bg-indigo-500 rounded">Edit</button></span>
            </div>
            ))
          }
        </div>
    </div>
  );
}
