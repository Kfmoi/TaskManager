import express from "express";
import {
  registerUser,
  loginUser,
  deleteUserAccount,
} from "../handlers/userHandler.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const message = await registerUser(username, password);
    res.status(200).json({ status: message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const loginData = await loginUser(username, password);
    res.json(loginData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Account
router.delete("/", async (request, response) => {
  const { username, password } = request.body;

  try {
    const message = await deleteUserAccount(username, password);
    response.status(200).json({ message });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

export { router as usersRouter };
