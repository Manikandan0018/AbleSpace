import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import { initSocket } from "./socket.js";
import mongoose from "mongoose";

dotenv.config(); 

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
