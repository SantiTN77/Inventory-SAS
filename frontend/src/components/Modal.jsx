import { Fragment } from "react";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 min-w-[320px] max-w-md relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        {title && <h3 className="text-xl font-bold mb-4 text-blue-700">{title}</h3>}
        <div>{children}</div>
      </div>
    </div>
  );
}
