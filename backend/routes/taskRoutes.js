import express from "express";
import * as TaskController from "../controller/taskController.js";
import * as AuthController from '../controller/authController.js'

const router = express.Router();

/// Auth routes
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

/// Task routes
router.get("/", TaskController.homePage);
router.get("/getTasks/:user", TaskController.getTasks);
router.post("/addTask", TaskController.addTask);
router.put("/toggleCheckBox/:id", TaskController.toggleCheckBox);
router.delete("/deleteTask/:id", TaskController.deleteTask);
router.delete("/deleteAllTasks", TaskController.deleteAllTasks);
router.post("/updateTask", TaskController.updateTask);


export default router;
