import { Request, Response } from "express";
import { User } from "../models/User.js";

export async function getUsers(_req: Request, res: Response) {
  const users = await User.find().select("_id name email");
  res.json(users);
}
