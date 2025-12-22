import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { socket } from "../socket";

import Header from "../components/Header";
import NotificationBell from "../components/NotificationBell";
import CreateTaskForm from "../components/CreateTaskForm";
import TaskFilterSidebar from "../components/TaskFilterSidebar";
import TaskCard from "./TaskCard";

type User = {
  _id: string;
  name: string;
};

type Task = {
  _id: string;
  title: string;
  description: string;
  status: "Not started" | "In Progress" | "Review" | "Completed";
  priority: "Low" | "Medium" | "High" | "Urgent";
  dueDate: string;
  creatorId: User;
  assignedToId: User;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const loadTasks = () => {
    api.get("/tasks").then((res) => setTasks(res.data));
  };

  // Get logged-in user
  useEffect(() => {
    api.get("/users/me").then((res) => {
      setCurrentUserId(res.data.id);
      socket.emit("register", res.data.id);
    });
  }, []);

  // Realtime updates
  useEffect(() => {
    loadTasks();
    socket.on("task-updated", loadTasks);

    return () => {
      socket.off("task-updated", loadTasks);
    };
  }, []);

  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    if (statusFilter) {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    if (priorityFilter) {
      filtered = filtered.filter((t) => t.priority === priorityFilter);
    }

    filtered.sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    );

    return filtered;
  }, [tasks, statusFilter, priorityFilter, sortOrder]);

  return (
    <>
      <Header />

      <div className="min-h-screen mt-30 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-6">
          {/* TOP BAR */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500">
                Manage tasks and collaborate with your team
              </p>
            </div>
            <NotificationBell />
          </div>

          {/* MAIN LAYOUT */}
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* LEFT FILTER PANEL (STICKY DESKTOP ONLY) */}
            <aside
              className="
                hidden lg:block
                w-64 shrink-0
                sticky top-24
                h-[calc(100vh-6rem)]
                overflow-y-auto
              "
            >
              <TaskFilterSidebar
                statusFilter={statusFilter}
                priorityFilter={priorityFilter}
                sortOrder={sortOrder}
                setStatusFilter={setStatusFilter}
                setPriorityFilter={setPriorityFilter}
                setSortOrder={setSortOrder}
              />
            </aside>

            {/* RIGHT CONTENT (SCROLL AREA) */}
            <main
              className="
                flex-1
                h-auto lg:h-[calc(100vh-6rem)]
                overflow-y-visible lg:overflow-y-auto
                space-y-6
              "
            >
              {/* CREATE TASK (FIRST ON MOBILE) */}
              <section className="order-1 rounded-xl bg-white p-5 shadow-sm">
                <CreateTaskForm onTaskCreated={loadTasks} />
              </section>

              {/* FILTERS ON MOBILE */}
              <section className="order-2 block lg:hidden">
                <TaskFilterSidebar
                  statusFilter={statusFilter}
                  priorityFilter={priorityFilter}
                  sortOrder={sortOrder}
                  setStatusFilter={setStatusFilter}
                  setPriorityFilter={setPriorityFilter}
                  setSortOrder={setSortOrder}
                />
              </section>

              {/* TASK LIST */}
              <section className="order-3">
                {filteredTasks.length === 0 ? (
                  <div className="rounded-xl border bg-white p-12 text-center text-gray-500">
                    No tasks found
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {filteredTasks.map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        currentUserId={currentUserId}
                      />
                    ))}
                  </div>
                )}
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
