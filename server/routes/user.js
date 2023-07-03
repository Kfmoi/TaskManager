import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {

    const { name, email, password } = req.body;
    
    if(!name || !email || !password) {
        return res.status(400).json({ message: "Please enter all required fields" });
    }

    const prevUser = UserModel.findOne({ username });

    if(prevUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
        name,
        email,
        password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

});

export { router as userRouter};
