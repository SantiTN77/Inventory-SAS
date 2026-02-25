const Joi = require('joi');

/** Validates the create-user request body */
const createUserSchema = Joi.object({
  nombre: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no puede exceder 100 caracteres',
      'any.required': 'El nombre es obligatorio',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'El correo electrónico no es válido',
      'any.required': 'El correo electrónico es obligatorio',
    }),
  password: Joi.string()
    .min(6)
    .max(128)
    .required()
    .messages({
      'string.min': 'La contraseña debe tener al menos 6 caracteres',
      'string.max': 'La contraseña no puede exceder 128 caracteres',
      'any.required': 'La contraseña es obligatoria',
    }),
  rol: Joi.string().required().messages({
    'any.required': 'El rol es obligatorio',
  }),
  plan: Joi.string().required().messages({
    'any.required': 'El plan es obligatorio',
  }),
});

/** Validates the update-user request body (all fields optional) */
const updateUserSchema = Joi.object({
  nombre: Joi.string().min(2).max(100),
  email: Joi.string().email(),
  password: Joi.string().min(6).max(128),
  rol: Joi.string(),
  plan: Joi.string(),
  activo: Joi.boolean(),
}).min(1).messages({
  'object.min': 'Debes enviar al menos un campo para actualizar',
});

module.exports = { createUserSchema, updateUserSchema };
