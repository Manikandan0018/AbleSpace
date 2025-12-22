import axios from "axios";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: VITE_BACKEND_URL || "http://localhost:5000/api",
  withCredentials: true,
});

export default api;
