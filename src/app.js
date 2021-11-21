require("dotenv").config();
const Cors = require("cors");
npm 
var mysql = require('mysql2');
var createError = require('http-errors');

var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
//puerto que usa heroku
const port = process.env.PORT || 8080;
//directorio donde angular genera el build
app.use(express.static(path.join(__dirname, 'bin')));

//conexion bd
app.use(mysqlConnection(mysql, {
  host: '',
  user: '',
  password: '',
  database: ''
}, 'request'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(Cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//rutas
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'bin/index.html'));
});

app.listen(port, ()=> {
  console.log('Server started on port '+port);
})

module.exports = app;
