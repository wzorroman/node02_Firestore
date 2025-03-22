import { BaseController } from './base.controller.js';
import { validateCliente } from '../models/Cliente.js';

export const clientesController = new BaseController('clientes', validateCliente);

export const createCliente = clientesController.create.bind(clientesController);
export const getClientes = clientesController.getAll.bind(clientesController);
export const getClienteById = clientesController.getById.bind(clientesController);
export const updateCliente = clientesController.update.bind(clientesController);
export const patchCliente = clientesController.patch.bind(clientesController);
export const deleteCliente = clientesController.delete.bind(clientesController);