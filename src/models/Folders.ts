import mongoose, { Model } from "mongoose";
type TFolderModel={
    name:string,
    // path:string,
    // children:TFolderModel
};

const folderSchema= new mongoose.Schema<TFolderModel>({
    name:{type:String,required:true},
    // path:{type:String,required:true},
    // children:{type:{},required:true}
});

const FolderModel:Model<TFolderModel>=mongoose.models.FolderModel || mongoose.model('FolderModel', folderSchema);

export default FolderModel;