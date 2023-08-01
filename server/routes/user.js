import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Missing username and/or password" });
  }

  const prevUser = await UserModel.findOne({ username });

  if (prevUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new UserModel({
    username,
    password: hashedPassword,
  });

  await user.save();

  res.status(200).json({
    status: `User ${username} registered!`,
  });
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Missing username and/or password" });
  }

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username: user.username, id: user._id },
    process.env.JWT_SECRET
  );

  res.json({
    status: `User ${username} logged in!`,
    token,
    u: user._id,
  });
});

// Delete Account
router.delete('/', async (request, response) => {
  const {username, password} = request.body;

  if (!username || !password) {
    return response
      .status(400)
      .json({ message: "Missing username and/or password" });
  }

  const user = await UserModel.findOne({ username });

  if (!user) {
    return response.status(400).json({ message: "User does not exist" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return response.status(400).json({ message: "Invalid credentials" });
  }

  await UserModel.findOneAndDelete({username});

  response.status(200).json({
    message: `${username} account is deleted`
  })
})



export { router as usersRouter };
