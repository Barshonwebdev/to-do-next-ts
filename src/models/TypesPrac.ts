
import mongoose, { Model } from "mongoose";

type TTypeModel={
    name:string,
    main_ingredients:[],
    country_of_origin:string,
    flavor:string,
    price:number,
    vegetarian:boolean
}

const typeSchema=new mongoose.Schema<TTypeModel>({
    name:{type:String},
    main_ingredients:{type:[]},
    country_of_origin:{type:String},
    flavor:{ type:String},
    price:{type:Number},
    vegetarian:{type:Boolean}
})

const TypeModel:Model<TTypeModel>= mongoose.models.TypeModel || mongoose.model ("TypeModel",typeSchema);

export default TypeModel;