import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    id: String
});

export const UserModel = mongoose.model("user", userSchema);