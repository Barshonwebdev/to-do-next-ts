import mongoose, { Model } from "mongoose";
type TFolderModel = {
  name: string;
  parentId: string;
};

const folderSchema = new mongoose.Schema<TFolderModel>({
  name: { type: String, required: true },
  parentId: { type: String, required: true },
});

const FolderModel: Model<TFolderModel> =
  mongoose.models.FolderModel || mongoose.model("FolderModel", folderSchema);

export default FolderModel;
