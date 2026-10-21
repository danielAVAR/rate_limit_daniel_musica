export const GENEROS_VALIDOS = ['Rock', 'Pop', 'Clásica', 'Folk', 'Jazz', 'Reggaetón', 'Salsa', 'Electrónica', 'Hip Hop'];

export function validarCancion(req, res, next) {
  const { titulo, artista, genero, album, anio, duracion } = req.body ?? {};
  const errores = [];

  if (typeof titulo !== 'string' || titulo.trim() === '') errores.push('titulo es obligatorio (texto)');
  if (typeof artista !== 'string' || artista.trim() === '') errores.push('artista es obligatorio (texto)');
  if (typeof album !== 'string' || album.trim() === '') errores.push('album es obligatorio (texto)');
  if (!GENEROS_VALIDOS.includes(genero)) errores.push(`genero debe ser uno de: ${GENEROS_VALIDOS.join(', ')}`);
  if (!Number.isInteger(anio) || anio < 1900 || anio > new Date().getFullYear()) {
    errores.push('anio debe ser un entero entre 1900 y el año actual');
  }
  if (!Number.isInteger(duracion) || duracion <= 0) errores.push('duracion debe ser un entero positivo (segundos)');

  if (errores.length > 0) {
    return res.status(400).json({ error: 'Datos inválidos', detalles: errores });
  }
  next();
}
