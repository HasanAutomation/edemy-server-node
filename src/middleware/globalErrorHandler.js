const globalErrorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 400).json({
    errors: [
      {
        error: err.message,
      },
    ],
    data: [],
    status: err.status || 'fail',
  });
};
module.exports = globalErrorHandler;
