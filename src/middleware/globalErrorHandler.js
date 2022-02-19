const globalErrorHandler = (err, req, res, next) => {
  let customError;

  if (Array.isArray(err.message)) {
    customError = err.message;
  } else {
    customError = [
      {
        error: err.message,
      },
    ];
  }

  res.status(err.statusCode || 400).json({
    errors: customError,
    data: [],
    status: err.status || 'fail',
  });
};
module.exports = globalErrorHandler;
