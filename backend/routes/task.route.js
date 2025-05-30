import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller.js';
// Importing the task controller functions  

const router = express.Router();

//Get all tasks
router.get("/", getTasks);

// Create a new task
router.post("/", createTask);

// Update a task
router.put("/:id", updateTask);

// Delete a task
router.delete("/:id", deleteTask);

export default router;
