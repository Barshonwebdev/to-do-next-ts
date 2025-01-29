"use server";

type Item = {
  _id: string;
  value: string;
};

// Mongodb
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://barshonweb:eYgyPnRe5YOXhQC3@cluster0.xm1pp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// DELETE server action
export async function deleteTask(id: string) {
  if (!id) return null;
  await client.connect();
  const result = await client
    .db("todo")
    .collection("tasks")
    .deleteOne({ _id: new ObjectId(id) });
  return result;
}

// PUT server action
export async function putTask(item: Item, editText: string) {
  if (!item._id) return null;
  await client.connect();
  console.log(item);
  const result = await client
    .db("todo")
    .collection("tasks")
    .updateOne({ _id: new ObjectId(item._id) }, { $set: { value: editText } });
  console.log(result);
  return result;
}
