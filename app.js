var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

require('dotenv').config();

var db = mongoose.connect(process.env.DB_CONN);
require('./db/models');

// Routing
var page_login = require('./routes/login');
var page_events = require('./routes/events');
var api_users = require('./routes/api/users');
var api_events = require('./routes/api/events');

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
app.use(express.static(path.join(__dirname, 'public')));

// User Database
var User = mongoose.model('User');

// Passport Authentication
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({shotcode: username}, function(err, user) {
      if(err) {
        return done(err);
      } else if (!user) {
        return done(null, false, { message: 'Incorrect Username' });
      } else if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect Password' });
      } else {
        return done(null, user);
      }
    });
}));


// Page Routing
app.use('/login', page_login);
app.use('/logout', page_login);
app.use('/', page_events)
app.use('/manage', page_events);

// API Routing
app.use('/api/users', api_users);
app.use('/api/events', api_events);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
    console.info('Express server listening on port ' + app.get('port'));
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
