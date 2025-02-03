'use server'

import connectDB from "@/app/cache/cacheFolderDb";
import FolderModel from "@/models/Folders";

export async function deleteFolder(id: string) {
    if (!id) return null;
    await connectDB();
    const result = await FolderModel.deleteOne({ _id: id });
    console.log(result);
    if (result.deletedCount === 1) {
      return { message: " deletion successful" };
    } else {
      return { message: "folder not deleted" };
    }
  }