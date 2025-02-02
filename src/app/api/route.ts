"use server";
import connectDatabase from "@/lib/mongoose";
import TaskModel from "@/models/Task";

type CreateItem = { value: string };

// read server action

export async function readTasks() {
  await connectDatabase();
  const tasks = await TaskModel.find({});
  const parsedData = JSON.parse(JSON.stringify(tasks));
  return parsedData;
}

// read aggregated data
export async function aggregatePipelinefunc() {
  await connectDatabase();
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
  await connectDatabase();
  const newTask = await TaskModel.create({ value: item.value });
}
