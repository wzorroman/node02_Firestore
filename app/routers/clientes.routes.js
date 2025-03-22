import express from 'express';
import { 
  createCliente, 
  getClientes,
  getClienteById,
  updateCliente,
  patchCliente, 
  deleteCliente 
} from '../controllers/clientes.controller.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const result = await createCliente(req.body);
    res.status(201).json(result);
  } catch (error) {
    const statusCode = error.message.includes('validation') ? 400 : 500;
    res.status(statusCode).json({ 
      error: error.message,
      details: error.details || null
    });
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

router.get('/:id', async (req, res) => {
    try {
      const result = await getClienteById(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateCliente(id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await patchCliente(id, req.body);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCliente(id);
    res.status(204).json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export { router as clientesRouter };
