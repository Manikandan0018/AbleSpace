import { useEffect, useState } from "react";
import { socket } from "../socket";
import api from "../api/axios";

type Notification = {
  _id: string;
  message: string;
  isRead: boolean;
};

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  // Load from DB
  useEffect(() => {
    api.get("/notifications").then((res) => {
      setNotifications(res.data);
    });
  }, []);

  // Realtime
  useEffect(() => {
    socket.on("notification", (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  async function toggleBell() {
    const next = !open;
    setOpen(next);

    if (next && unreadCount > 0) {
      await api.post("/notifications/read");

      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    }
  }

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={toggleBell}
        className="
         flex items-center gap-2
        rounded-xl px-4 py-2
        bg-white/70 backdrop-blur-xl
        border border-white/30
        shadow hover:shadow-md
        transition
      "
      >
        <span className="text-lg">📩</span>
        <span className="text-sm font-medium text-gray-700">Inbox</span>

        {unreadCount > 0 && (
          <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
    absolute right-0 mt-3
    w-[90vw] max-w-[420px]
    rounded-2xl border border-white/30
    bg-white/90 backdrop-blur-xl
    shadow-xl z-50
  "
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h3 className="font-semibold text-gray-900">Activity</h3>
            <span className="text-xs text-gray-500">{unreadCount} unread</span>
          </div>

          {/* Content */}
          <div className="max-h-[360px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="mb-3 text-3xl text-gray-300">📭</div>
                <p className="text-sm text-gray-500">You’re all caught up</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  className={`
                  group flex gap-3 px-5 py-4 border-b last:border-none
                  hover:bg-gray-50 transition
                  ${n.isRead ? "bg-white" : "bg-blue-50/40"}
                `}
                >
                  {/* Icon */}
                  <div
                    className={`
                    mt-1 h-8 w-8 rounded-full flex items-center justify-center
                    ${
                      n.isRead
                        ? "bg-gray-200 text-gray-500"
                        : "bg-blue-600 text-white"
                    }
                  `}
                  >
                    📝
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <p
                      className={`text-sm ${
                        n.isRead ? "text-gray-600" : "font-medium text-gray-900"
                      }`}
                    >
                      {n.message}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">Just now</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
