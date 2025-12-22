import { Schema, model, Types, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: "Not started" | "In Progress" | "Review" | "Completed";
  priority: "Low" | "Medium" | "High" | "Urgent";
  dueDate: Date;
  creatorId: Types.ObjectId;
  assignedToId: Types.ObjectId;
}

const TaskSchema = new Schema<ITask>({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["Not started", "In Progress", "Review", "Completed"],
    default: "Not started",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Urgent"],
    default: "Medium",
  },
  dueDate: Date,
  creatorId: { type: Schema.Types.ObjectId, ref: "User" },
  assignedToId: { type: Schema.Types.ObjectId, ref: "User" },
});

export const Task = model<ITask>("Task", TaskSchema);
