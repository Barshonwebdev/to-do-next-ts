import mongoose from "mongoose";

const uri =
  "mongodb+srv://barshonweb:eYgyPnRe5YOXhQC3@cluster0.xm1pp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDatabase= async()=>{
    
        await mongoose.connect(uri);
        console.log("connected to database");
    
}

export default connectDatabase;