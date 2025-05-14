// Esquemas de validación con Joi
const Joi = require('joi');

exports.productSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required(),
  stock: Joi.number().integer().min(0).required(),
  precio: Joi.number().min(0).required()
});

exports.categorySchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required()
});

exports.providerSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required(),
  contacto: Joi.string().email().required()
});

exports.movementSchema = Joi.object({
  descripcion: Joi.string().min(2).max(200).required(),
  tipo: Joi.string().valid('Ingreso', 'Egreso').required(),
  monto: Joi.number().min(0).required()
});
