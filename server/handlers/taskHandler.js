import { UserModel } from "../models/UserModel.js";
import { TaskModel } from "../models/TaskModel.js";

const createTask = async (userId, title, description, status) => {
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return { status: 404, data: { error: "User not found" } };
    }

    if (!title || !description || !status) {
      return { status: 405, data: { error: "Missing Information" } };
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

    return { status: 200, data: { status: `Task ${title} saved!` } };
  } catch (error) {
    return { status: 500, data: { error: "Internal server error" } };
  }
};

const getUserTasks = async (userId) => {
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return { status: 404, data: { error: "User not found" } };
    }

    const tasks = await TaskModel.find({ user: userId });

    return { status: 200, data: tasks };
  } catch (error) {
    return { status: 500, data: { error: "Internal server error" } };
  }
};

const deleteTask = async (userId, taskId) => {
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return { status: 404, data: { error: "User not found" } };
    }

    const task = await TaskModel.findById(taskId);

    if (!task) {
      return { status: 404, data: { error: "Task not found" } };
    }

    if (task.user.toString() !== userId) {
      return { status: 403, data: { error: "Forbidden" } };
    }

    user.tasks = user.tasks.filter(
      (taskId) => taskId.toString() !== task._id.toString()
    );

    await user.save();
    await TaskModel.findByIdAndDelete(taskId);

    return { status: 200, data: { message: "Task deleted successfully" } };
  } catch (error) {
    return { status: 500, data: { error: "Internal server error" } };
  }
};

const updateTask = async (userId, taskId, title, description, status) => {
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return { status: 404, data: { error: "User not found" } };
    }

    const task = await TaskModel.findById(taskId);

    if (!task) {
      return { status: 404, data: { error: "Task not found" } };
    }

    if (task.user.toString() !== userId) {
      return { status: 403, data: { error: "Forbidden" } };
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    await task.save();

    return { status: 200, data: { message: "Task updated successfully" } };
  } catch (error) {
    return { status: 500, data: { error: "Internal server error" } };
  }
};

const deleteAllTasks = async (userId) => {
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return { status: 404, data: { error: "User not found" } };
    }

    await TaskModel.deleteMany({ user: userId });
    user.tasks = [];
    await user.save();

    return { status: 200, data: { message: "All tasks deleted successfully" } };
  } catch (error) {
    return { status: 500, data: { error: "Internal server error" } };
  }
};

export { createTask, getUserTasks, deleteTask, updateTask, deleteAllTasks };
