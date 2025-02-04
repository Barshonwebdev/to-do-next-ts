import mongoose, { Model } from "mongoose";
type TFolderModel = {
  name: string;
  parentId: string | null;
};

const folderSchema = new mongoose.Schema<TFolderModel>({
  name: { type: String,  },
  parentId: { type: String },
});

const FolderModel: Model<TFolderModel> =
  mongoose.models.FolderModel || mongoose.model("FolderModel", folderSchema);

export default FolderModel;
