'use server'

import FolderModel from "@/models/Folders";
import connectDB from "../cache/cacheFolderDb";

type CreateFolder={
    name: string,

    
}

export async function readFolders() {
    await connectDB();
    const folders = await FolderModel.find({});
    const parsedData = JSON.parse(JSON.stringify(folders));
    console.log(parsedData);
    return parsedData;
  }

  export async function postFolder(folder: CreateFolder) {
    await connectDB();
    const newTask = await FolderModel.create({ name: folder.name});
  }