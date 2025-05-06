import React from "react";

export default function Tutorial() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 animate-fade-in">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Bienvenido al Tutorial de Punto SAS</h1>
      <p className="mb-4 text-lg text-gray-700">Esta sección te guiará paso a paso para que puedas aprovechar al máximo nuestro sistema POS e inventario. Aquí encontrarás instrucciones, videos y artículos útiles para comenzar.</p>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">1. Introducción en Video</h2>
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">[Espacio para video introductorio]</span>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">2. Guía Rápida</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Cómo registrar productos y gestionar inventario.</li>
          <li>Realizar ventas y movimientos de caja.</li>
          <li>Administrar roles y usuarios.</li>
          <li>Configurar notificaciones y preferencias.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">3. Blog y Documentación</h2>
        <div className="bg-blue-50 rounded-lg p-4 text-gray-700">
          <p>Próximamente: artículos, tips y mejores prácticas para tu negocio.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">4. Soporte y Ayuda</h2>
        <p className="text-gray-700">¿Tienes dudas? Contáctanos o revisa la sección de preguntas frecuentes.</p>
      </section>
    </div>
  );
}
