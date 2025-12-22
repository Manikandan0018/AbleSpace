import { useEffect, useState } from "react";
import api from "../api/axios";

type Props = {
  onTaskCreated: () => void;
};

type User = {
  _id: string;
  name: string;
  email: string;
};

export default function CreateTaskForm({ onTaskCreated }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Not started");
  const [assignedToId, setAssignedToId] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  // ✅ Fetch users for assignment
  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await api.post("/tasks", {
      title,
      description,
      dueDate,
      priority,
      status,
      assignedToId,
    });

    // reset form
    setTitle("");
    setDescription("");
    setDueDate("");
    setAssignedToId("");

    onTaskCreated();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
    rounded-3xl
    bg-white
    shadow-2xl
    px-6 py-6 sm:px-10 sm:py-8
  "
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Create task</h2>
        <p className="mt-1 text-sm text-gray-500">
          Add details and assign responsibility
        </p>
      </div>

      {/* Title */}
      <input
        className="
      w-full
      text-xl font-medium
      placeholder:text-gray-400
      border-none outline-none
      focus:ring-0
      mb-6
      bg-gray-50
    "
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* Description */}
      <textarea
        className="
      w-full
      min-h-[120px]
      resize-none
      text-sm text-gray-700
      placeholder:text-gray-400
      border-none outline-none
      focus:ring-0
      mb-8
      bg-gray-100 p-2 rounded
    "
        placeholder="Describe the task…"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Meta row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <input
          type="date"
          className="rounded-lg border px-3 py-2 text-sm"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />

        <select
          className="rounded-lg border px-3 py-2 text-sm"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Urgent</option>
        </select>

        <select
          className="rounded-lg border px-3 py-2 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Not started</option>
          <option>In Progress</option>
          <option>Review</option>
          <option>Completed</option>
        </select>

        <select
          className="rounded-lg border px-3 py-2 text-sm"
          value={assignedToId}
          onChange={(e) => setAssignedToId(e.target.value)}
          required
        >
          <option value="">Assign to user</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="
        rounded-xl bg-black
        px-6 py-3
        text-sm font-semibold text-white
        hover:bg-gray-900
        transition
      "
        >
          Create task
        </button>
      </div>
    </form>
  );
}
