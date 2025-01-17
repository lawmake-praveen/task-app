import * as TaskModel from "../model/taskModel.js";
import pool from "../config/config.js";

export const homePage = async (req, res) => {
  try {
    // Create the database
    // const response = pool.query(
    //   "CREATE DATABASE IF NOT EXISTS `task-app-database`",
    //   function (err, result) {
    //     if (err) throw err;
    //     console.log("Database created");
    //   }
    // );
    // res.send(`${response}`);
    res.send("Just checking if node.js is running 2");
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getTasks = async (req, res) => {
  try {
    const user = req.params.user;
    const [rows] = await TaskModel.getTasks(user);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const addTask = async (req, res) => {
  try {
    const { task, status, createdAt, user } = req.body;
    const addRow = await TaskModel.addTask(task, status, createdAt, user);
    res.status(200).json({ message: "Task added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const toggleCheckBox = async (req, res) => {
  try {
    const { id } = req.params;
    const [row] = await TaskModel.getTaskStatus(id);
    if (row.length == 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    const currentStatus = row[0].status;
    const newStatus = currentStatus ? 0 : 1;

    const update = await TaskModel.toggleCheckBox(newStatus, id);
    if (update.affectedRows == 0) {
      return res.status(404).json({ message: "No task found" });
    } else {
      return res.status(200).json({ message: `Task changed to ${newStatus}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const [action] = await TaskModel.deleteTask(id);

    if (action.affectedRows == 0) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.status(200).json({ message: "Task deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteAllTasks = async (req, res) => {
  try {
    const [action] = await TaskModel.deleteAllTasks();
    if (action.affectedRows == 0) {
      return res.status(404).json({ message: "No task to delete" });
    }
    res.status(200).json({ message: "All tasks deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id, task, status } = req.body;
    if (!id || typeof task != "string") {
      return res.status(400).json({ message: "Invalid data" });
    }
    const [result] = await TaskModel.updateTask(id, task, status);
    if (result.affectedRows == 0) {
      return res.status(404).json({ message: "No task found" });
    } else {
      return res.status(200).json({ message: "Task updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
