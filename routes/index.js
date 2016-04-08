module.exports = function(app) {
  
  app.use('/events', require('./events'));
  app.use('/partials', require('./partials'));
  app.use('/login', require('./users/login'))
  app.use('/logout', require('./users/logout'))
  app.use('/api', require('./api'))

  app.get('/*', function(req, res, next){
    res.render('container');
  })

 // app.get('/*', function(req, res, next){
 //   res.render('container');
 // })
};
