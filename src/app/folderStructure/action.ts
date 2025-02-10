"use server";

import FolderModel from "@/models/Folders";
import connectDB from "../cache/cacheFolderDb";

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

  if (result.deletedCount === 1) {
    return { message: " deletion successful" };
  } else {
    return { message: "folder not deleted" };
  }
  async function deleteParentAndChild(id: string | undefined) {
    if (id !== undefined) {
      const findFolders = await FolderModel.find({ parentId: id });
      const deleteFolders = await FolderModel.deleteOne({ parentId: id });
      deleteParentAndChild(findFolders[0]?._id);
    }
  }
}
