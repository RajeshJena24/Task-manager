import mongoose from "mongoose";    
import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.log("Error fetching tasks:", error.message);    
    res.status(500).json({ success:false, message: error.message });
  }
};

export const createTask = async (req, res) => {
  const { task_name, task_description, task_timelimit, task_priority = "medium", task_status = "pending" } = req.body;

  if (!task_name || !task_description || !task_timelimit) {
    return res.status(400).json({ success: false, message: "Title, description and timelimit are required" });
  }

  const newTask = new Task({
    task_name,
    task_description,
    task_timelimit,
    task_priority,
    task_status
  });

  try {
    await newTask.save();
    res.status(201).json({ success: true, task: newTask });
  } catch (error) {
    console.log("Error creating task:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { task_name, task_description, task_timelimit, task_priority, task_status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Task ID" });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task_name, task_description, task_timelimit, task_priority, task_status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    console.log("Error updating task:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Task ID" });
  }

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.log("Error deleting task:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};