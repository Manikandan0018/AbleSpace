import { useNavigate } from "react-router-dom";

import logo from "../image/logo.jpeg";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header
      className="
        fixed top-0 z-30 w-full
        flex justify-center
        backdrop-blur-md
        border-b border-white/10
        bg-fuchsia-300/20
      "
    >
      <div
        className="
          flex items-center justify-between
          w-full max-w-7xl
          px-6 py-4
        "
      >
        {/* Left Nav */}
        <nav className="flex items-center gap-8 text-sm font-medium text-black">
          <img className="w-20" src={logo} alt="" />
          <button className="cursor-pointer hover:opacity-80 transition">
            Dashboard
          </button>
          <button className="cursor-pointer hidden lg:block hover:opacity-80 transition">
            Tasks
          </button>
          <button className="cursor-pointer hidden lg:block hover:opacity-80 transition">
            Team
          </button>
          <button className="cursor-pointer hidden lg:block hover:opacity-80 transition">
            About
          </button>
        </nav>

        {/* Right Circular CTA */}
        <button
          onClick={() => navigate("/signup")}
          className="
            w-20 h-20
            rounded-full
            border-2 border-black
            text-black
            flex items-center justify-center
            text-sm font-semibold
            transition
            hover:border-blue-500
            hover:text-blue-600
            cursor-pointer
          "
        >
          Join
          <br />
          Free
        </button>
      </div>
    </header>
  );
}
