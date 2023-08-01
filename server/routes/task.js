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

    if(!title && !description && !status){
      return res.status(405).json({error: "Missing Information"})
    }

    const task = new TaskModel({
      title,
      description,
      status,
      user: user._id,
    });

    user.tasks.push(task._id);

    await user.save();

    await task.save();

    res.status(200).json({
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

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Task
router.delete("/:userId/:taskId", async (req, res) => {
  const { userId, taskId } = req.params;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.user.toString() !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    user.tasks = user.tasks.filter(
      (taskId) => taskId.toString() !== task._id.toString()
    );

    await user.save();

    await TaskModel.findByIdAndDelete(taskId);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Task
router.put("/:userId/:taskId", async (req, res) => {
  const { userId, taskId } = req.params;
  const { title, description, status } = req.body;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Check if the task belongs to the specified user
    if (task.user.toString() !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    // Update the task properties
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    await task.save();

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete all tasks
router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User  not found" });
    }

    await TaskModel.deleteMany({ user: userId });
    user.tasks = [];
    await user.save();
    res.status(200).json({ message: "All tasks deleted successfullt" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as taskRouter };
