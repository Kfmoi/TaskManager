import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import { usersRouter } from './routes/user.js';
import { taskRouter } from './routes/task.js';


dotenv.config();

// App config
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// DB config
mongoose.connect(process.env.MONGODB_URI);


// API endpoints
app.use('/user', usersRouter);
app.use('/task', taskRouter);

// Listener
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
