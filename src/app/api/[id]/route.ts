import { NextRequest } from "../../../../node_modules/next/server";
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

export async function DELETE(request:NextRequest){
    const id = new ObjectId(request.nextUrl.searchParams.get("id"));
    if (!id) return null;
    await client.connect();
    const result = await client.db('todo').collection("tasks").deleteOne({_id:id});
    return result; 
  }

  export async function PUT(request: NextRequest){
     await client.connect();
    const id = new ObjectId(request.nextUrl.searchParams.get("id"));
    if(!id) return null;
    await client.db("todo").collection("tasks").updateOne({_id: id}, {greeting:"this greeting has been updated"});
    return Response.json({message: "successfully updated the document"})  
  }