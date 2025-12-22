import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import Header from "../components/Header";
import Toast from "../components/Toast";
import logo from "../image/logo.jpeg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      socket.emit("register", res.data._id);

      setToast({
        message: "Logged in successfully!",
        type: "success",
      });

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch {
      setToast({
        message: "Invalid email or password",
        type: "error",
      });
    }
  }

  return (
    <>
      <Header />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4">
        {/* Glow */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="h-[420px] w-[420px] rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl" />
        </div>

        <form
          onSubmit={handleLogin}
          className="relative z-10 w-full max-w-md rounded-2xl border border-white/30 bg-white/70 backdrop-blur-xl shadow-2xl p-8"
        >
          <div className="flex justify-center">
            <img src={logo} alt="Logo" className="w-36" />
          </div>
          <h2 className="text-3xl mt-5 font-extrabold text-gray-900 mb-2">
            Welcome back
          </h2>
          <p className="text-gray-500 mb-6">Log in to continue collaborating</p>

          <input
            className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="w-full mb-6 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 transition">
            Login
          </button>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Don’t have an account?{" "}
            <span
              className="underline cursor-pointer font-medium"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </>
  );
}
