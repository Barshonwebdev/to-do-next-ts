import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  _id: String,
  value: String,
});
const TaskModel = mongoose.models.Task || mongoose.model("TaskModel", taskSchema);

export default TaskModel ;
