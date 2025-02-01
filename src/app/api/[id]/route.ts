"use server";

import connectDatabase from "@/lib/mongoose";
import TaskModel from "@/models/Task";

type Item = {
  _id: string;
  value: string;
};

// DELETE server action
export async function deleteTask(id: string) {
  if (!id) return null;
  await connectDatabase();
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
  await connectDatabase();
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
