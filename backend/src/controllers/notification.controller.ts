import { Request, Response } from "express";
import {
  getUserNotifications,
  markAllAsRead,
} from "../services/notification.service.js";

export async function getNotifications(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const notifications = await getUserNotifications(userId);
  res.json(notifications);
}

export async function markNotificationsRead(req: Request, res: Response) {
  const userId = (req as any).user.id;
  await markAllAsRead(userId);
  res.json({ success: true });
}
