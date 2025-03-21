// routes/clientes.routes.js
import express from 'express';
import { 
  createCliente, 
  getClientes, 
  updateCliente, 
  deleteCliente 
} from '../controllers/clientes.controller.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const result = await createCliente(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (_, res) => {
  try {
    const clientes = await getClientes();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Implementar similares para PUT y DELETE
