import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export default function Toast({
  message,
  type = "success",
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      <div
        className={`
          px-6 py-3 rounded-xl shadow-lg
          backdrop-blur-xl border
          flex items-center gap-3
          transition-all
          ${
            type === "success"
              ? "bg-white/80 border-green-200 text-green-700"
              : "bg-white/80 border-red-200 text-red-700"
          }
        `}
      >
        <span className="text-lg">{type === "success" ? "✅" : "❌"}</span>
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
}
