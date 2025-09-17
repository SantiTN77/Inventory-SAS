// Controlador de Planes para Inventory POS
const Plan = require('../models/plan');

exports.getPlanes = async (req, res) => {
  try {
    const planes = await Plan.find();
    res.json(planes);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener planes', error: err.message });
  }
};

exports.createPlan = async (req, res) => {
  try {
    const plan = new Plan(req.body);
    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear plan', error: err.message });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plan) return res.status(404).json({ message: 'Plan no encontrado' });
    res.json(plan);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar plan', error: err.message });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Plan no encontrado' });
    res.json({ message: 'Plan eliminado' });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar plan', error: err.message });
  }
};
