import mongoose, { Model } from "mongoose";

type TTaskModel = {
  value: string;
};

const taskSchema = new mongoose.Schema<TTaskModel>({
  value: { type: String, required: true },
});

const TaskModel: Model<TTaskModel> =
  mongoose.models.TaskModel || mongoose.model("TaskModel", taskSchema);

export default TaskModel;
