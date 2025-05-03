import { useEffect } from "react";

export default function Notification({ open, message, type = "info", onClose }) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 2500);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;
  const color =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";
  return (
    <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-semibold ${color} animate-fade-in`}>
      {message}
    </div>
  );
}
