import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";

const registerUser = async (username, password) => {
  if (!username || !password) {
    throw new Error("Missing username and/or password");
  }

  const prevUser = await UserModel.findOne({ username });

  if (prevUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new UserModel({
    username,
    password: hashedPassword,
  });

  await user.save();

  return `User ${username} registered!`;
};

const loginUser = async (username, password) => {
  if (!username || !password) {
    throw new Error("Missing username and/or password");
  }

  const user = await UserModel.findOne({ username });

  if (!user) {
    throw new Error("User does not exist");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { username: user.username, id: user._id },
    process.env.JWT_SECRET
  );

  return {
    message: `User ${username} logged in!`,
    token,
    userId: user._id,
  };
};

const deleteUserAccount = async (username, password) => {
  if (!username || !password) {
    throw new Error("Missing username and/or password");
  }

  const user = await UserModel.findOne({ username });

  if (!user) {
    throw new Error("User does not exist");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid credentials");
  }

  await UserModel.findOneAndDelete({ username });

  return `${username} account is deleted`;
};

export { registerUser, loginUser, deleteUserAccount };
