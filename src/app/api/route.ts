"use server";
import connectDatabase from "@/lib/mongoose";
import TaskModel from "@/models/Task";

type CreateItem = { value: string };

// read server action

export async function readTasks() {
  await connectDatabase();
  const tasks = await TaskModel.find({});
  const parsedData = JSON.parse(JSON.stringify(tasks));
  console.log(parsedData);
  return parsedData;
}

// post server action
export async function postTask(item: CreateItem) {
  await connectDatabase();
  const newTask = await TaskModel.create({ value: item.value });
  await newTask.save();
}
