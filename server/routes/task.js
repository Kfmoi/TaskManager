import express from "express";
import {
  createTask,
  getUserTasks,
  deleteTask,
  updateTask,
  deleteAllTasks,
} from "../handlers/taskHandler.js";

const router = express.Router();

// Post Task
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { title, description, status } = req.body;

  const result = await createTask(userId, title, description, status);

  res.status(result.status).json(result.data);
});

// Get User Tasks
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  const result = await getUserTasks(userId);

  res.status(result.status).json(result.data);
});

// Delete Task
router.delete("/:userId/:taskId", async (req, res) => {
  const { userId, taskId } = req.params;

  const result = await deleteTask(userId, taskId);

  res.status(result.status).json(result.data);
});

// Update Task
router.put("/:userId/:taskId", async (req, res) => {
  const { userId, taskId } = req.params;
  const { title, description, status } = req.body;

  const result = await updateTask(userId, taskId, title, description, status);

  res.status(result.status).json(result.data);
});

// Delete all tasks
router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;

  const result = await deleteAllTasks(userId);

  res.status(result.status).json(result.data);
});

export { router as taskRouter };
