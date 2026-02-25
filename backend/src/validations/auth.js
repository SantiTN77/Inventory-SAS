const Joi = require('joi');

/** Validates the login request body */
const loginSchema = Joi.object({
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
});

module.exports = { loginSchema };
