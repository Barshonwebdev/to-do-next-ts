"use client";

import React, { useEffect, useState } from "react";
import "@ant-design/v5-patch-for-react-19";
import { RxCross2 } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
import { postTask, readTasks } from "./api/route";
import { deleteTask, putTask } from "./api/[id]/route";
import { Modal } from "antd";

type Item = {
  _id: string;
  value: string;
};

type TCreateItem = { value: string };

export default function Todo() {
  const [userInput, setUserInput] = useState("");
  const [editInput,setEditInput]=useState("");
  const [list, setList] = useState<Item[]>([]);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      // server action
      const data = await readTasks();
      setList(data);
    }
    fetchTasks();
  }, []);

  //setting user input
  const updateInput = (value: string) => {
    setUserInput(value);
    setEditInput(value);
  };

  // edit task function
  async function editTask(editItem: Item, editInput: string) {
    // server action
    await putTask(editItem,editInput);

    // server action
    const data = await readTasks();
    setList(data);
  }

  // add task function
  async function addTask(item: TCreateItem) {
    // server action
    await postTask(item);

    // server action
    const data = await readTasks();
    setList(data);
  }

  //Add handling function
  const handleAdd = () => {
    if (userInput.trim() === "") return;
    const newItem = {
      value: userInput,
    };
    addTask(newItem);
    setUserInput(" ");
  };

  //Edit handling function
  const handleEdit = () => {
    if (editInput.trim() === "") return;
    if (editItem !== null) {
      // Edit existing item
      editTask(editItem, editInput);
      setUserInput(" ");
    }
  };
  // Delete task function
  async function deleteTaskfunc(id: string) {
    await deleteTask(id);

    const data = await readTasks();
    setList(data);
  }
  const showModal = (item: Item) => {
    setIsModalOpen(true);
    setUserInput(item.value);
    setEditItem(item);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleEdit();

  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Editing function
  const startEdit = (item: Item) => {
    showModal(item);
  };

  return (
    <div className="mx-auto flex w-1/2 flex-col justify-center bg-gray-100 py-8">
      <h1 className="mt-5 text-center text-5xl">To Do App</h1>
      <div className="mx-auto mt-8 flex w-1/2 flex-col justify-center space-x-2 space-y-3 md:flex-row">
        <input
          placeholder="Add what you wanna do..."
          className="border-gray border-2 px-4 sm:mx-auto md:mx-0"
          type="text"
        />
        <button
          onClick={() => handleAdd()}
          className="rounded-lg bg-blue-500 px-4 py-1 text-white hover:bg-green-500"
        >
          Add Task
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
                    onClick={() => deleteTaskfunc(item._id)}
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
        {/* modal  */}
        <>
          <Modal
            title="Edit Your Task"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <input
              placeholder="edit your task"
              onChange={(e) => updateInput(e.target.value)}
              value={userInput}
              className="border-gray border-2 px-4 sm:mx-auto md:mx-0"
              type="text"
            />
          </Modal>
        </>
      </div>
    </div>
  );
}
