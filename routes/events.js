var express = require('express');
var router = express.Router();
var db = require('mongoose');
var Events = db.model('Events');
var SignUpUser = db.model('SignUpUser');
var passport = require('passport');


/*
 * GET Home page.
 */
router.get('/', function(req, res, next) {
  res.render('events', {title: 'DoCSoc | Events'});
});

/*
 * GET Manage page.
 */
router.get('/manage',/* passport.authenticate('local'),*/ function(req, res, next) {
  res.render('manage', {title: 'DoCSoc | Manage Events'});
});

/*
 * GET Post page.
 */
router.get('/post',/* passport.authenticate('local'),*/ function(req, res, next) {
  res.render('post', {title: 'DoCSoc | Create Event'});
});

/*
 * GET Single Event
 */
router.get('/events/:slug', function(req, res, next) {
  var query = Events.findOne({slug: req.params.slug}).select();
  query.exec(function(err, event){
    if(err) {
      res.status(500).json(err);
      return;
    } else {
      event.title = 'DoCSoc | ' + event.name;
      res.render('event', event);
    }
  });
});

router.get('/events/:slug/edit', function(req, res, next) {
  var query = Events.findOne({slug: req.params.slug}).select();
  query.exec(function(err, event) {
    if(err) {
      res.status(500).json(err);
      return;
    } else {
      event.title = 'DoCSoc | Edit Event';
      res.render('edit', event);
    }
  });
});

/*
 * UPDATE Event
 */
router.post('/events/:slug/update', function(req, res, next) {
  var update = {slug: req.body.slug,
                name: req.body.name,
                place: req.body.place,
                date: req.body.date,
                description: req.body.description
               }
  Events.findOneAndUpdate({slug: req.params.slug}, update, function(err, event){
    if(err) {
      res.status(500).json(err);
      return;
    } else {
      event.title = 'DoCSoc | ' + event.name;
      res.render('event', event);
    }
  });
});

/*
 * Event Sign Up Page
 */
router.get('/events/:slug/signup', function(req, res, next) {
  res.render('signup', {title: 'DoCSoc | Sign Up'});
});

/*
 * API Routes
 */
router.route('/api/events')
  .get(function(req, res) {
    var query = Events.find({}).select();
    query.exec(function(err, events) {
      if(err) {
        res.status(500).json(err);
        return;
      } else {
        res.json(events);
      }
    });
  })
  .post(/*passport.authenticate('local'),*/ function(req, res) {
    var entry = req.body;
    entry.slug = entry.slug.split(' ').join('-');
    var event = new Events(entry);
    event.save(function(err){
      if(err) {
	res.status(500).json(err);
	return;
      } else {
	res.redirect('/');
      }
    });
  })

/*
 * GET and UPDATE Event
 */
router.route('/api/events/:slug')
  .get(function(req, res){
    var query = Events.findOne({slug: req.params.slug}).select();
     query.exec(function(err, event){
       if(err) {
         res.status(500).json(err);
         return;
       } else {
         res.json(event);
       }
     });
   })
  .post(function(req, res){
    var update = {  slug: req.body.slug,
                    name: req.body.name,
                    place: req.body.place,
                    date: req.body.date,
                    description: req.body.description
                 }
    Events.findOneAndUpdate({slug: req.params.slug}, update, function(err, event){
      if(err) {
        res.status(500).json(err);
        return;
      } else {
        res.render(event);
      }
    });
  })

/*
 * Start Event Sign Up
 */
router.get('/api/events/:slug/start', function(req, res){
  Events.findOneAndUpdate({slug: req.params.slug}, {$set: {signUpOpen: true}}, function(err, event){
    if(err) {
      res.status(500).json(err);
      return;
    } else {
      res.json(event.signUpOpen);
    }
  });
});

/*
 * End Event Sign Up
 */
router.get('/api/events/:slug/end', function(req, res){
  Events.findOneAndUpdate({slug: req.params.slug}, {$set: {signUpOpen: false}}, function(err, event){
    if(err) {
      res.status(500).json(err);
      return;
    } else {
      res.json(event.signUpOpen);
    }
  });
});

/*
 *  Get Event State
 */
router.get('/api/events/:slug/state', function(req, res){
  Events.findOne({slug: req.params.slug}, function(err, event){
    if(err) {
      res.status(500).json(err);
      return;
    } else {
      res.json(event.signUpOpen);
    }
  });
});

/*
 * POST Sign Up LIst
 */
router.post('/api/events/:slug/signup', function(req, res){
  Events.findOneAndUpdate({slug: req.params.slug},{$push: {signUpList: new SignUpUser(req.body)}}, function(err, event) {
    if(err) {
      res.status(500).json(err);
      return;
    } else {
      res.json(event.signUpList);
    }
  });
});

module.exports = router;
