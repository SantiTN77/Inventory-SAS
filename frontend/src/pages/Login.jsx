import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticación simulada
    if (email === "demo@email.com" && password === "demo123") {
      setError("");
      navigate("/");
    } else {
      setError("Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 animate-fade-in">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-blue-100 flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center">Iniciar Sesión</h1>
        <input
          type="text"
          placeholder="Correo o usuario"
          className="border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Entrar</button>
        <button type="button" className="text-blue-600 hover:underline text-sm mt-1 mb-2" onClick={() => alert('Funcionalidad próximamente disponible.')}>¿Olvidaste tu contraseña?</button>
        <div className="text-xs text-gray-400 text-center mt-2">Demo: demo@email.com / demo123</div>
      </form>
    </div>
  );
}
