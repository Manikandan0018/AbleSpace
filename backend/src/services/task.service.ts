import { Task, ITask } from "../models/Task.js";
import { Notification } from "../models/Notification.js";
import { notifyUser, notifyTaskUpdate } from "../socket.js";
import { User } from "../models/User.js";

export async function createTask(data: any) {
  // ✅ THIS FIXES THE TYPE PROBLEM
  const task = (await new Task(data).save()) as ITask;

  if (task.assignedToId) {
    const creator = await User.findById(task.creatorId).select("name");

    const notification = await Notification.create({
      userId: task.assignedToId,
      taskId: task._id,
      message: `${creator?.name} assigned you the task "${task.title}"`,
      isRead: false,
    });

    notifyUser(task.assignedToId.toString(), notification);
  }

  notifyTaskUpdate();
  return task;
}

export async function updateTask(id: string, data: any, userId: string) {
  const task = await Task.findById(id);

  if (!task) {
    throw new Error("Task not found");
  }

  // 🔒 Only assigned user can update status
  if (data.status && task.assignedToId.toString() !== userId) {
    throw new Error("Not allowed to update this task");
  }

  const updatedTask = await Task.findByIdAndUpdate(id, data, {
    new: true,
  });

  // 🔔 Notify on reassignment
  if (data.assignedToId && task.assignedToId.toString() !== data.assignedToId) {
    const creator = await User.findById(task.creatorId).select("name");

    const notification = await Notification.create({
      userId: data.assignedToId,
      taskId: task._id,
      message: `${creator?.name} assigned you the task "${task.title}"`,
      isRead: false,
    });

    notifyUser(data.assignedToId.toString(), notification);
  }

  notifyTaskUpdate();
  return updatedTask;
}
