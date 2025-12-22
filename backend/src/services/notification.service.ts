import mongoose from "mongoose";
import { Notification } from "../models/Notification.js";

export async function getUserNotifications(userId: string) {
  return Notification.find({
    userId: new mongoose.Types.ObjectId(userId),
  }).sort({ createdAt: -1 });
}

export async function markAllAsRead(userId: string) {
  await Notification.updateMany(
    { userId: new mongoose.Types.ObjectId(userId), isRead: false },
    { $set: { isRead: true } }
  );
}
