var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');
var http = require('http');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

require('dotenv').config();

var db = mongoose.connect(process.env.DB_CONN);
require('./db/models');

// Routing
//var login = require('./routes/login');
//var events = require('./routes/events');
//var users = require('./routes/api/users/index');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('express-session')({
  secret: process.env.SECRET_HASH,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
app.use(helmet());

// User Database
var User = mongoose.model('User');

// Passport Authentication
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);


app.use('/bower_components',  express.static(__dirname + '/bower_components'));
require('./routes')(app);
// Page Routing
//app.use('/', events)
//app.use('/login', login);
//app.use('/logout', login);
//app.use('/partials/manage', events);
//app.use('/events', events);
//app.use('/partials/event', events);
//app.use('/partials/edit', events);
//app.use('/partials/signup', events);
//app.use('/partials/post', events);
//app.use('/events/:slug', events);
//app.use('/events/:slug/update', events);
//app.use('/events/:slug/edit', events);
//
//// API Routing
//app.use('/api/users', users);
//app.use('/api/events', events);

// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  req.db = db;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//HTTP Server
var server = http.createServer(app);
var boot = function () {
  server.listen(app.get('port'), function(){
    console.info('Application running on port ' + app.get('port'));
  });
}
var shutdown = function () {
	server.close();
}
if (require.main === module) {
	boot();
} else {
  console.info('Running app as a module')
  exports.boot = boot;
  exports.shutdown = shutdown;
  exports.port = app.get('port');
}
 module.exports = app;
