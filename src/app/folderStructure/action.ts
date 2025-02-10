"use server";

import FolderModel from "@/models/Folders";
import connectDB from "../cache/cacheFolderDb";
import { ObjectId } from "mongodb";

type CreateFolder = {
  name: string;
  parentId: string | undefined;
};

export async function readFolders() {
  await connectDB();
  const folders = await FolderModel.find({});
  const parsedData = JSON.parse(JSON.stringify(folders));
  //console.log(parsedData);
  return parsedData;
}

export async function postFolder(folder: CreateFolder) {
  //console.log(folder);
  await connectDB();
  await FolderModel.create({
    name: folder.name,
    parentId: folder.parentId,
  });
}

export async function deleteFolder(id: string) {
  if (!id) return null;
  await connectDB();
  const result = await FolderModel.deleteOne({ _id: id });
  deleteParentAndChild(id);
  async function deleteParentAndChild(id: string) {
    if (id !== undefined) {
      const findFolders = await FolderModel.find({ parentId: id });
      for (const eachFolder of findFolders) {
        const deleteChildFolder = await FolderModel.deleteOne({
          _id: eachFolder._id,
        }); 
       await deleteParentAndChild(eachFolder._id.toString());
      }
    }

    else {
      return null;
    }
  }

  if (result.deletedCount === 1) {
    return { message: " deletion successful" };
  } else {
    return { message: "folder not deleted" };
  }
}
