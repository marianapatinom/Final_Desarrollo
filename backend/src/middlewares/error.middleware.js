export const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Error interno del servidor';

  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((item) => item.message)
      .join('. ');
  }

  if (error.code === 11000) {
    statusCode = 409;
    message = 'El email ya esta registrado';
  }

  if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Identificador invalido';
  }

  res.status(statusCode).json({
    message,
    status: statusCode
  });
};
