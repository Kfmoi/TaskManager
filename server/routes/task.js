import express from "express";
import { TaskModel } from "../models/TaskModel.js";
import { UserModel } from "../models/UserModel.js";

const router = express.Router();

// Post Task
router.post("/:userId", async (req, res) => {
    const { userId } = req.params;
    const { title, description, status } = req.body;

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const task = new TaskModel({
            title,
            description,
            status,
            user: user._id // Assigning the user reference to the task
        });

        user.tasks.push(task._id);

        await user.save();

        await task.save();

        res.json({
            status: `Task ${title} saved!`,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get User Tasks
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;

    try {

        const user = UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const tasks = await TaskModel.find({ user: userId });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


export { router as taskRouter};
