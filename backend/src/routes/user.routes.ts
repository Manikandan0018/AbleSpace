import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUsers } from "../controllers/user.controller.js";

const router = Router();

// ✅ logged-in user info (used for socket registration)
router.get("/me", authMiddleware, (req, res) => {
  res.json((req as any).user);
});

// ✅ list all users (used in CreateTaskForm)
router.get("/", authMiddleware, getUsers);

export default router;
