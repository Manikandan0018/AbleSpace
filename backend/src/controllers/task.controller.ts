import { Request, Response } from "express";
import * as taskService from "../services/task.service.js";
import { Task } from "../models/Task.js";

export async function getTasks(req: Request, res: Response) {
  const tasks = await Task.find()
    .populate("creatorId", "name")
    .populate("assignedToId", "name");

  res.json(tasks);
}

export async function createTask(req: Request, res: Response) {
  const task = await taskService.createTask({
    ...req.body,
    creatorId: (req as any).user.id,
  });

  res.json(task);
}

export async function updateTask(req: Request, res: Response) {
  const task = await taskService.updateTask(
    req.params.id,
    req.body,
    (req as any).user.id
  );

  res.json(task);
}
