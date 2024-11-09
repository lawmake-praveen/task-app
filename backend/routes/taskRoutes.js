import express from "express";
import * as TaskController from "../controller/taskController.js";

const router = express.Router();

router.get("/getTasks", TaskController.getTasks);
router.post("/addTask", TaskController.addTask);
router.put("/toggleCheckBox/:id", TaskController.toggleCheckBox);
router.delete("/deleteTask/:id", TaskController.deleteTask);
router.delete("/deleteAllTasks", TaskController.deleteAllTasks);
router.post("/updateTask", TaskController.updateTask);

export default router;
