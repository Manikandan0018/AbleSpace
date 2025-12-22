import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getNotifications,
  markNotificationsRead,
} from "../controllers/notification.controller.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getNotifications);
router.post("/read", markNotificationsRead); // ✅ NEW

export default router;
