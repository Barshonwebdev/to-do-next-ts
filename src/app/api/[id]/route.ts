import { NextRequest, NextResponse } from "../../../../node_modules/next/server";
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

export async function DELETE(request:NextRequest,{params}: {params: Promise <{id:string}>}){
    const id= (await params).id;
    if (!id) return null;
    await client.connect();
    const result = await client.db('todo').collection("tasks").deleteOne({_id: new ObjectId(id)});
    return result; 
  }
export async function GET(request:NextRequest, { params }: { params: Promise<{ id: string }> }){
    const id = (await params).id
    console.log(id);
    if (!id) return null;
    await client.connect();
    const result = await client.db('todo').collection("tasks").findOne({_id:new ObjectId (id)});
    return NextResponse.json(result); 
  }

  export async function PUT(request: NextRequest,{params}: {params: Promise<{id:string}>}){
      const id=(await params).id;
      const body=await request.json();
      console.log(body);
      if(!id) return null;
     await client.connect();
    await client.db("todo").collection("tasks").updateOne({_id:new ObjectId (id)}, {$set:{value:body}});
    return NextResponse.json({message: "successfully updated the document"})  
  }