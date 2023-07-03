import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    id: String,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "task" }]
});

export const UserModel = mongoose.model("user", userSchema);