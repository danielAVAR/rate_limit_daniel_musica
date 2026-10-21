import { Router } from 'express';
import { canciones } from '../data/canciones.db.js';
import { validarCancion } from '../middlewares/validator.js';
import { crearCancionLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

const siguienteId = () => (canciones.length ? Math.max(...canciones.map((c) => c.id)) + 1 : 1);
const buscarIndice = (id) => canciones.findIndex((c) => c.id === Number(id));

router.get('/', (req, res) => {
  res.json({
    total: canciones.length,
    tokens_restantes: req.rateLimit?.remaining,
    data: canciones,
  });
});

router.get('/:id', (req, res) => {
  const index = buscarIndice(req.params.id);
  if (index === -1) return res.status(404).json({ error: `No existe la canción con id ${req.params.id}` });
  res.json(canciones[index]);
});

router.post('/', crearCancionLimiter, validarCancion, (req, res) => {
  const { titulo, artista, genero, album, anio, duracion } = req.body;
  const nueva = {
    id: siguienteId(),
    titulo: titulo.trim(),
    artista: artista.trim(),
    genero,
    album: album.trim(),
    anio,
    duracion,
  };
  canciones.push(nueva);
  res.status(201).json(nueva);
});

router.put('/:id', validarCancion, (req, res) => {
  const index = buscarIndice(req.params.id);
  if (index === -1) return res.status(404).json({ error: `No existe la canción con id ${req.params.id}` });

  const { titulo, artista, genero, album, anio, duracion } = req.body;
  canciones[index] = {
    id: canciones[index].id,
    titulo: titulo.trim(),
    artista: artista.trim(),
    genero,
    album: album.trim(),
    anio,
    duracion,
  };
  res.json(canciones[index]);
});

router.delete('/:id', (req, res) => {
  const index = buscarIndice(req.params.id);
  if (index === -1) return res.status(404).json({ error: `No existe la canción con id ${req.params.id}` });

  const [eliminada] = canciones.splice(index, 1);
  res.json({ mensaje: 'Canción eliminada', cancion: eliminada });
});

export default router;
