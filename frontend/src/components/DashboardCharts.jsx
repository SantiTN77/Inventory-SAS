import React from "react";

// Gráficas de ejemplo (puedes reemplazar por Chart.js, ApexCharts, etc. en el futuro)
export default function DashboardCharts() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
      {/* Gráfica de barras de ventas */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 flex flex-col">
        <span className="font-bold text-primary-600 mb-2 text-lg">Ventas semanales</span>
        <div className="flex-1 flex items-end gap-3 h-40">
          {[60, 80, 40, 100, 90, 30, 70].map((h, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div className="w-8 rounded-t bg-gradient-to-t from-green-400 to-green-500 shadow-md" style={{height: `${h}%`}}></div>
              <span className="text-xs text-gray-400 mt-1 font-semibold">{['L','M','M','J','V','S','D'][i]}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Gráfica de pastel de productos */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 flex flex-col items-center justify-center">
        <span className="font-bold text-primary-600 mb-2 text-lg">Inventario por categoría</span>
        <svg width="120" height="120" viewBox="0 0 32 32">
          <circle r="16" cx="16" cy="16" fill="#f3f4f6" />
          <circle r="16" cx="16" cy="16" fill="transparent" stroke="#3b82f6" strokeWidth="8" strokeDasharray="100 60" strokeDashoffset="0" />
          <circle r="16" cx="16" cy="16" fill="transparent" stroke="#22c55e" strokeWidth="8" strokeDasharray="60 100" strokeDashoffset="-100" />
        </svg>
        <div className="flex gap-4 mt-2 text-xs">
          <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-blue-500"></span> Electrónica</span>
          <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-green-500"></span> Alimentos</span>
        </div>
      </div>
    </div>
  );
}
