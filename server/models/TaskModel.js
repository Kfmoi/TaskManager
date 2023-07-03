import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: String,
    description: String,
    status: String,
    id: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
});

export const TaskModel = mongoose.model("task", taskSchema);