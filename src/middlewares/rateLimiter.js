import { rateLimit } from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: true,
  statusCode: 429,
  message: {
    codigo: 429,
    error: 'Demasiadas solicitudes. Tu playlist necesita una pausa 🎵',
  },
});

export const crearCancionLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 3,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  statusCode: 429,
  message: {
    codigo: 429,
    error: 'Has subido demasiadas canciones seguidas. Espera un minuto 🎤',
  },
});
