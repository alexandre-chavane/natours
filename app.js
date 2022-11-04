const express = require('express');

const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const tourRouter = require('./routers/tourRoutes');
const userRouter = require('./routers/tourRoutes');

const app = express();

// Http func, url, status code time and size: logger

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());
// Serving static files
app.use(express.static(`${__dirname}/public`));

// Anonymous midddlewire
app.use((req, res, next) => {
  console.log('Hello From Middleware!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// all verbs NOT treated yet
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server`,
  // });

  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.statusCode = 404;
  // err.status = 'fail';

  // Goin'straight to specific middl
  // next(err);

  // Fill error properties and then call glonal error handler
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Error handling middl
app.use(globalErrorHandler);

module.exports = app;
