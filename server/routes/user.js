import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel.js';

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
  
    res.json({
      status: `User ${username} registered!`,
    });
  });
  

export { router as usersRouter};
