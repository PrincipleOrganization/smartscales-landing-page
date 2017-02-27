'use strict';

/**
* Module dependencies.
**/

const express = require('express');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const router = require('./router');

/**
* Module body.
**/

// Normalize a port into a number, string, or false.
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// Event listener for HTTP server "error" event.
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof app.port === 'string'
  ? 'Pipe ' + app.port
  : 'Port ' + app.port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
    console.log(bind + ' requires elevated privileges');
    process.exit(1);
    break;
    case 'EADDRINUSE':
    console.log(bind + ' is already in use');
    process.exit(1);
    break;
    default:
    throw error;
  }
}

// Event listener for HTTP server "listening" event.
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
  ? 'pipe ' + addr
  : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

// Express and Server.
const app = express();
app.set('env', (process.env.NODE_ENV || 'development'));
app.set('port', normalizePort(process.env.PORT || 8080));
// app.use(favicon(path.resolve('../client', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('views', './server/pug');
app.set('view engine', 'pug');
app.use(express.static(path.join('./client/public')));

let server = http.createServer(app);
server.listen(app.get('port'));
server.on('error', onError);
server.on('listening', onListening);

app.use('/', router);

// If routh not find.
app.get('*', function(req, res){
  res.status(404).send('Not found')
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(err);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/**
* Export.
**/

module.exports = app;
