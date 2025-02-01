import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  value: String,
});


const TaskModel = mongoose.models.TaskModel || mongoose.model("TaskModel", taskSchema);

export default TaskModel ;
