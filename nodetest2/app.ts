///<reference path='types/DefinitelyTyped/node/node.d.ts'/>

///<reference path='types/DefinitelyTyped/express/express.d.ts'/> 
interface Error {

                 status?: number;

           }
class ApplicationTest {
  app;
   constructor(){
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

var routes = require('./routes/index');
var users = require('./routes/users');

this.app = express();
 


// view engine setup ............... test github pull function 1234
this.app.set('views', path.join(__dirname, 'views'));
this.app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
this.app.use(logger('dev'));
this.app.use(bodyParser.json());
this.app.use(bodyParser.urlencoded({ extended: false }));
this.app.use(cookieParser());
this.app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
this.app.use(function(req,res,next){
    req.db = db;
    next();
});

this.app.use('/', routes);
this.app.use('/users', users);

// catch 404 and forward to error handler
this.app.use(function(req, res, next) {

  var err = new Error('test');
  err.status = 100;

  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (this.app.get('env') === 'development') {
  this.app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
this.app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

}
}
var application = new Application();
module.exports = application.app;

