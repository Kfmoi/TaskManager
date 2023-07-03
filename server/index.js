import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

// App config
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// DB config
mongoose.connect(process.env.MONGODB_URI);


// API endpoints

// Listener
app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT}`));
