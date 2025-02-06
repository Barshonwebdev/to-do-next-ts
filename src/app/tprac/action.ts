'use server'

import TypeModel from "@/models/TypesPrac";
import connectDB from "../cache/cacheTsDb"

export async function readTypes(){
    await connectDB();
    const types=await TypeModel.find({});
    const parsedData=JSON.parse(JSON.stringify(types));
    return parsedData;
}

