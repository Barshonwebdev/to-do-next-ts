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

async function deleteParentAndChild(id: string) {
  if (id !== undefined) {
    const findFolders = await FolderModel.find({ parentId: id });
    for (const eachFolder of findFolders) {
      const deleteChildFolder = await FolderModel.deleteOne({
        _id: eachFolder._id,
      });
      await deleteParentAndChild(eachFolder._id.toString());
    }
  } else {
    return null;
  }
}
export async function deleteFolder(id: string) {
  if (!id) return null;
  await connectDB();
  const result = await FolderModel.deleteOne({ _id: id });
  deleteParentAndChild(id);

  if (result.deletedCount === 1) {
    return { message: " deletion successful" };
  } else {
    return { message: "folder not deleted" };
  }
}

export async function putFolder(id: string, editName: string) {
  if (!id) return null;
  await connectDB();
  const result = await FolderModel.updateOne(
    { _id: id },
    { $set: { name: editName } },
  );

  // validate if folder actually exists
  console.log(result);
  if (result.matchedCount === 1) {
    return { message: "success" };
  } else {
    return { message: "folder not found" };
  }
}
