"use client";

import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";

type Item = {
  _id: string;
  value: string;
};

type TCreateItem = { value: string };

export default function Todo() {
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState<Item[]>([]);
  const [editItem, setEditItem] = useState<Item | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch("http://localhost:3000/api");
      const data = await res.json();
      setList(data);
    }
    fetchTasks();
  }, []);

  //setting user input
  const updateInput = (value: string) => {
    setUserInput(value);
  };

  // edit task function
  async function editTask(id: string) {
    await fetch(`/api/${id}`, {
      method: "PUT",
      body: JSON.stringify(userInput),
    });

    const res = await fetch("http://localhost:3000/api");
    const data = await res.json();
    setList(data);
  }

  // add task function
  async function addTask(item: TCreateItem) {
    await fetch("/api", {
      method: "POST",
      body: JSON.stringify(item),
    });
    const res = await fetch("http://localhost:3000/api");
    const data = await res.json();
    setList(data);
  }

  //Add or Edit handling function
  const handleAddorEdit = () => {
    if (userInput.trim() === "") return;
    if (editItem !== null) {
      // Edit existing item
      editTask(editItem._id);
    } else {
      // Add new item
      const newItem = {
        value: userInput,
      };
      addTask(newItem);
    }
    setUserInput(" ");
  };

  // Delete task function
  async function deleteTask(id: string) {
    await fetch(`/api/${id}`, {
      method: "DELETE",
    });
    const res = await fetch("http://localhost:3000/api");
    const data = await res.json();
    setList(data);
  }

  // Editing function
  const startEdit = (item: Item) => {
    setUserInput(item.value);
    setEditItem(item);
  };

  return (
    <div className="mx-auto flex w-1/2 flex-col justify-center bg-gray-100 py-8">
      <h1 className="mt-5 text-center text-5xl">To Do App</h1>
      <div className="mx-auto mt-8 flex w-1/2 flex-col justify-center space-x-2 space-y-3 md:flex-row">
        <input
          placeholder="Add what you wanna do..."
          onChange={(e) => updateInput(e.target.value)}
          value={userInput}
          className="border-gray border-2 px-4 sm:mx-auto md:mx-0"
          type="text"
        />
        <button
          onClick={() => handleAddorEdit()}
          className="rounded-lg bg-blue-500 px-4 py-1 text-white hover:bg-green-500"
        >
          {editItem !== null ? "Update task" : "Add task"}
        </button>
      </div>
      <div className="mt-5">
        <h1 className="mb-3 text-center text-lg text-gray-500">To Do List</h1>
        <div className="flex flex-col items-center justify-center space-y-3">
          {list.map((item) => (
            <div className="flex flex-col space-y-2" key={item._id}>
              <div className="text-center">
                <span className="text-2xl font-bold text-green-500">
                  {item.value}
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className=" ">
                  <button
                    onClick={() => deleteTask(item._id)}
                    className="flex items-center rounded bg-red-500 p-1 text-white"
                  >
                    <RxCross2></RxCross2> Delete
                  </button>
                </span>
                <span>
                  <button
                    onClick={() => startEdit(item)}
                    className="flex items-center rounded bg-orange-500 px-2 py-1 text-white"
                  >
                    <CiEdit></CiEdit>Edit
                  </button>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
