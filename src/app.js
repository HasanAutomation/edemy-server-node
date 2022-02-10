const express = require('express');
const connectDB = require('./util/db');
const globalErrorHandler = require('./middleware/globalErrorHandler');
const AppError = require('./util/error');

const app = express();

// connect database
connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Edemy api' });
});

app.all('*', (req, res, next) => {
  next(new AppError('Not Found', 404));
});
app.use(globalErrorHandler);

module.exports = {
  app,
};
