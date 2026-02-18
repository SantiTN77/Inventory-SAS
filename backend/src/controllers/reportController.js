// Controlador para reportes e informes
exports.getSalesReport = (req, res) => {
  // Simulación de reporte de ventas
  res.json({ reporte: 'Ventas', total: 1000, fecha: new Date() });
};

exports.getInventoryReport = (req, res) => {
  // Simulación de reporte de inventario
  res.json({ reporte: 'Inventario', productos: 10, fecha: new Date() });
};

exports.getMovementsReport = (req, res) => {
  // Simulación de reporte de movimientos
  res.json({ reporte: 'Movimientos', ingresos: 500, egresos: 200, fecha: new Date() });
};
