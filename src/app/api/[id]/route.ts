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
  return result;
}

// PUT server action
export async function putTask(item: Item, editText: string) {
  if (!item._id) return null;
  await connectDatabase();
  const result = await TaskModel.updateOne(
    { _id: item._id },
    { $set: { value: editText } },
  );
  return result;
}
