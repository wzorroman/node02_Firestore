// models/Cliente.js
import Joi from 'joi';

const clienteSchema = Joi.object({
  nombres: Joi.string().min(3).max(50).required(),
  apellidos: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  celular: Joi.string().pattern(/^[0-9]{9}$/).required()
});

export const validateCliente = (data) => {
  return clienteSchema.validate(data);
};
