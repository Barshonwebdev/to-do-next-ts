'use client';

import React, { useState } from "react";


export default function Todo() {
  const [userInput,setUserInput]=useState('');
  const [list,setList]=useState([]);

  //setting user input 
  const updateInput=(value)=>{
    setUserInput(value);
  }

  //add task 
  const handleAdd=()=>{
    const newTask={
      id:Math.random(),
      value:userInput
    }
    setList([...list,newTask]);
    setUserInput(' ');
    
  }
  return (
    <div className="bg-white" >
      <h1 className="text-center text-5xl mt-5">To Do App</h1>
      <div className="flex justify-center mt-8 space-x-2">
        <input onChange={(e)=> updateInput(e.target.value)} value={userInput} className="p-1 border border-gray border-2" type="text" />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-2 py-1 hover:bg-green-500">Add task</button>
        
      </div>
      <div className="text-center mt-5">
          {
            list.map((item)=>(
            <div key={item.id}>
              <span className="text-green-500 text-3xl">{item.value}</span>
            </div>
            ))
          }
        </div>
    </div>
  );
}
