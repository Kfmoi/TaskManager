import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import { usersRouter } from './routes/user.js';


dotenv.config();

// App config
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// DB config
mongoose.connect("mongodb+srv://kfmoi26:Kfmoi_1412003@taskmanager.j8rjpzt.mongodb.net/app?retryWrites=true&w=majority");


// API endpoints
app.use('/user', usersRouter);

// Listener
app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT}`));
