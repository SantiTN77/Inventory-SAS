import React, { useState } from "react";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notif, setNotif] = useState({ open: false, message: "", type: "info" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotif({ open: false, message: "", type: "info" });
    try {
      const res = await fetch(`${getApiUrl()}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setNotif({ open: true, message: data.message || "Credenciales incorrectas. Intenta de nuevo.", type: "error" });
        return;
      }
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setNotif({ open: true, message: "¡Bienvenido!", type: "success" });
        setTimeout(() => navigate("/"), 1000);
      } else {
        setNotif({ open: true, message: "Respuesta inválida del servidor", type: "error" });
      }
    } catch (err) {
      setNotif({ open: true, message: err.message || "Error de autenticación", type: "error" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 via-primary-50 to-accent-100 animate-fade-in">
      <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-md rounded-3xl shadow-soft p-10 w-full max-w-md border border-primary-100 flex flex-col gap-6">
        <h1 className="text-4xl font-display font-bold text-primary-600 mb-2 text-center drop-shadow">Iniciar Sesión</h1>
        <input
          type="text"
          placeholder="Correo o usuario"
          className="border border-primary-200 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-primary-50/40 text-lg"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border border-primary-200 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-primary-50/40 text-lg"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="button" className="text-primary-500 hover:underline text-sm self-end mb-2 transition-all" onClick={() => alert('Funcionalidad próximamente disponible.')}>¿Olvidaste tu contraseña?</button>
        <Notification open={notif.open} message={notif.message} type={notif.type} onClose={() => setNotif({ ...notif, open: false })} />
        <button type="submit" className="bg-primary-500 text-white px-6 py-3 rounded-xl hover:bg-primary-600 hover:scale-105 transition-all duration-300 font-semibold text-lg">Entrar</button>
        <div className="text-xs text-primary-300 text-center mt-2">Demo: demo@email.com / demo123</div>
      </form>
    </section>
  );
}
