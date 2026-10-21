import express from 'express';
import { logger } from './middlewares/logger.js';
import { apiLimiter } from './middlewares/rateLimiter.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cancionesRoutes from './routes/canciones.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);
app.use('/api/', apiLimiter);

app.get('/', (req, res) => {
  res.json({ mensaje: ' API de Música · Campuslands', endpoints: '/api/canciones' });
});

app.use('/api/canciones', cancionesRoutes);

app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🎶 Servidor de Música iniciado en http://localhost:${PORT}`);
    console.log('🛡️  Rate Limit activo en /api/ (Máx: 5 req / min)');
  });
}

export default app;
