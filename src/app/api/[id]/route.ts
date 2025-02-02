"use server";

import connectDB from "@/app/cache/cacheDb";
import TaskModel from "@/models/Task";

// DELETE server action
export async function deleteTask(id: string) {
  if (!id) return null;
  await connectDB();
  const result = await TaskModel.deleteOne({ _id: id });
  console.log(result);
  if (result.deletedCount === 1) {
    return { message: " deletion successful" };
  } else {
    return { message: "task not deleted" };
  }
}

// PUT server action
export async function putTask(id: string, editText: string) {
  if (!id) return null;
  await connectDB();
  const result = await TaskModel.updateOne(
    { _id: id },
    { $set: { value: editText } },
  );

  // validate if task actually exists
  console.log(result);
  if (result.matchedCount === 1) {
    return { message: "success" };
  } else {
    return { message: "task not found" };
  }
}
