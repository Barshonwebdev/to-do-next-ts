"use server";
import TaskModel from "@/models/Task";
import connectDB from "../cache/cacheDb";

type CreateItem = { value: string };

// read server action

export async function readTasks() {
  await connectDB();
  const tasks = await TaskModel.find({});
  const parsedData = JSON.parse(JSON.stringify(tasks));
  return parsedData;
}

// read aggregated data
export async function aggregatePipelinefunc() {
  await connectDB();
  const aggData = await TaskModel.aggregate([
    { $match: { value: "work" } },
    { $count: "Works" },
  ]);

  const returnData = aggData[0]?.Works;
  if (returnData === undefined) {
    return 0;
  } else {
    return returnData;
  }
}

// post server action
export async function postTask(item: CreateItem) {
  await connectDB();
  const newTask = await TaskModel.create({ value: item.value });
}
