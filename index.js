// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clientesRouter } from './app/routers/clientes.routes.js';

// 1. Configurar variables de entorno
dotenv.config();

// 2. Crear instancia de Express
const app = express();
const port = process.env.PORT || 3000;

// 3. Configurar middlewares
app.use(cors());
app.use(express.json());

// 4. Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Clientes en Firebase 🔥');
});

// 5. Registrar rutas
app.use('/clientes', clientesRouter);

// 6. Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// 7. Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
