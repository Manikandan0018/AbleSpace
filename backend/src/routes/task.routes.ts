import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getTasks,
  createTask,
  updateTask,
} from "../controllers/task.controller.js";

const router = Router();
router.use(authMiddleware);

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);

export default router;
