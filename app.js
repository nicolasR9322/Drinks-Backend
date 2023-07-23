require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const connectDB = require("./config/db")

const app = express();

connectDB();

app
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))


  // Rutas

  .use('/', indexRouter)

// catch 404 and forward to error handler
  .use(function(req, res, next) {
  next(createError(404))
})

// error handler

  app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  // render the error page
  res.status(err.status || 500).json({
    status : err.status || 500,
    message : err.message
  });
});

module.exports = app;
