export function errorHandler(err, req, res, next) {
  console.error('💥 Error:', err.message);
  if (res.headersSent) return next(err);

  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: status === 500 ? 'Error interno del servidor' : err.message,
  });
}
