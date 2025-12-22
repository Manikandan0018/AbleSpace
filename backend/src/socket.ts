import { Server } from "socket.io";

let io: Server;

export function initSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: process.env.APPLICATION_URL || "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("register", (userId: string) => {
      socket.join(userId);
    });
  });
}

export function notifyUser(userId: string, payload: any) {
  io.to(userId).emit("notification", payload);
}

export function notifyTaskUpdate() {
  io.emit("task-updated");
}
