import { NextResponse } from "next/server";


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://barshonweb:eYgyPnRe5YOXhQC3@cluster0.xm1pp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const cursor = await client.db("todo").collection("tasks").find();
      const array = await cursor.toArray()
      return array;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
export async function GET(request: Request) {
  const data =  await run();
  return NextResponse.json(data)
}

// post api 
export async function POST(request: Request){
  await client.connect();
  const body= await request.json()
  const result = await client.db("todo").collection("tasks").insertOne({value:body.value});
  return NextResponse.json({message: "successfully updated the document"})
}

