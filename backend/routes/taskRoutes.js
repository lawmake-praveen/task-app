import express from "express";
import * as TaskController from "../controller/taskController.js";
import * as AuthController from "../controller/authController.js";
import { verifySessionToken } from "../middleware/sessionValidator.js";

const router = express.Router();

/// Auth routes
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

/// Task routes
router.get("/", TaskController.homePage);
router.get("/getTasks/:user", verifySessionToken, TaskController.getTasks);
router.post("/addTask", verifySessionToken, TaskController.addTask);
router.put(
  "/toggleCheckBox/:id",
  verifySessionToken,
  TaskController.toggleCheckBox
);
router.delete("/deleteTask/:id", verifySessionToken, TaskController.deleteTask);
router.delete(
  "/deleteAllTasks",
  verifySessionToken,
  TaskController.deleteAllTasks
);
router.post("/updateTask", verifySessionToken, TaskController.updateTask);

export default router;
