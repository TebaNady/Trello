import mongoose from "mongoose";
import { model } from "mongoose";
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    taskContent: {
        type: String,
        required: true,
    },
    receivedId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    status: {
        required: true,
        type: String,
        enum: ['toDo', 'doing', 'done'],
        default : "toDo"
      },
      userId: String,
      assignTo: String,
      deadline: Date,

}, {
    timestamps: true,
});
const taskModel = model("Task", taskSchema);
export default taskModel;



