"use server";
import connectDatabase from "@/lib/mongoose";
import TaskModel from "@/models/Task";
// import mongoose from "mongoose";

 type CreateItem = { value: string };

// // mongoose + mongodb
// //const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const uri =
//   "mongodb+srv://barshonweb:eYgyPnRe5YOXhQC3@cluster0.xm1pp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// // const client = new MongoClient(uri, {
// //   serverApi: {
// //     version: ServerApiVersion.v1,
// //     strict: true,
// //     deprecationErrors: true,
// //   },
// // });


// mongoose.connect(uri);

// const { Schema, model } = mongoose;
// const taskSchema = new Schema({
//   _id: String,
//   value: String,
// });


// const Task = mongoose.models.Task || mongoose.model('Task', taskSchema )  ;


// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     //await client.connect();
//     // const cursor = await client.db("todo").collection("tasks").find();
//     // const array = await cursor.toArray();
//     const tasks = await Task.find({});
//     console.log(tasks);
//     return tasks;
//     // return array;
//   } finally {
//     // Ensures that the client will close when you finish/error
//     //await client.close();
//   }
// }



// Read server action
// export async function readTasks() {
//   const data = await run();
//   const parsedData = JSON.parse(JSON.stringify(data));
//   console.log(parsedData);
//   return parsedData;
// }

export async function readTasks(){
  
    await connectDatabase();
    const tasks = await TaskModel.find({});
     const parsedData = JSON.parse(JSON.stringify(tasks));
     console.log(parsedData); 
     return parsedData;
  
}

// post server action
export async function postTask(item: CreateItem) {
  // await client.connect();
  // const result = await client
  //   .db("todo")
  //   .collection("tasks")
  //   .insertOne({ value: item.value });
  // const parsedResult = JSON.parse(JSON.stringify(result));
  // return parsedResult;

  await connectDatabase();
  const newTask= await TaskModel.create({value:item.value});
  await newTask.save();
}
