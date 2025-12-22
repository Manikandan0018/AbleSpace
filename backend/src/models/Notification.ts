import { Schema, model } from "mongoose";

const NotificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    message: String,
    taskId: { type: Schema.Types.ObjectId, ref: "Task" },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Notification = model("Notification", NotificationSchema);
