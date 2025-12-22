import api from "../api/axios";

type User = {
  _id: string;
  name: string;
};

type Task = {
  _id: string;
  title: string;
  status: "Not started" | "In Progress" | "Review" | "Completed";
  priority: "Low" | "Medium" | "High" | "Urgent";
  dueDate: string;
  creatorId: User;
  assignedToId: User;
};

const priorityColors: Record<Task["priority"], string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-orange-100 text-orange-700",
  Urgent: "bg-red-100 text-red-700",
};

export default function TaskCard({
  task,
  currentUserId,
}: {
  task: Task;
  currentUserId: string;
}) {
  // ✅ permission logic (unchanged)
  const canUpdateStatus =
    task.assignedToId?._id === currentUserId ||
    task.creatorId?._id === currentUserId;

  const updateStatus = async (status: Task["status"]) => {
    await api.put(`/tasks/${task._id}`, { status });
  };

  return (
    <div
      className="
        rounded-2xl
        border border-white/30
        bg-white/70 backdrop-blur-xl
        shadow
        hover:shadow-lg
        transition
        p-5
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
          <p className="mt-1 text-xs text-gray-500">
            {task.creatorId.name} →{" "}
            <span className="font-medium">{task.assignedToId.name}</span>
          </p>
        </div>

        {/* Priority */}
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        {/* Status */}
        {canUpdateStatus ? (
          <select
            value={task.status}
            onChange={(e) => updateStatus(e.target.value as Task["status"])}
            className="
              rounded-lg border border-gray-200
              bg-white/80 px-3 py-2
              text-sm font-medium
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          >
            <option>Not started</option>
            <option>In Progress</option>
            <option>Review</option>
            <option>Completed</option>
          </select>
        ) : (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
            {task.status}
          </span>
        )}

        {/* Due Date */}
        <span className="text-xs text-gray-400">
          Due{" "}
          {new Date(task.dueDate).toLocaleDateString(undefined, {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}
