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
    .max(128)
    .required()
    .messages({
      'string.max': 'La contraseña no puede exceder 128 caracteres',
      'any.required': 'La contraseña es obligatoria',
    }),
});

module.exports = { loginSchema };
