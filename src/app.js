const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { readdirSync } = require('fs');
const connectDB = require('./util/db');
const globalErrorHandler = require('./middleware/globalErrorHandler');
const AppError = require('./util/error');

const app = express();

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect database
connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Edemy api' });
});

// Mount routes
readdirSync(`${__dirname}/routes`).map(r =>
  app.use(`/api/v1/${r.split('.')[0]}`, require(`./routes/${r}`))
);

app.all('*', (req, res, next) => {
  next(new AppError('Not Found', 404));
});
app.use(globalErrorHandler);

module.exports = {
  app,
};
