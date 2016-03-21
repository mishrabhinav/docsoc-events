var express = require('express');
var router = express.Router();
var db = require('mongoose');
var Events = db.model('Events');


/*
 * GET Home page.
 */
router.get('/', function(req, res, next) {
  res.render('events', {title: 'DoCSoc | Events'});
});

/*
 * GET Manage page.
 */
router.get('/manage', function(req, res, next) {
  res.render('manage', {title: 'DoCSoc | Manage Events'});
});

/*
 * GET Post page.
 */
router.get('/post', function(req, res, next) {
  res.render('post', {title: 'DoCSoc | Create Event'});
});

/*
 * GET Single Event
 */
router.get('/:slug', function(req, res, next) {
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

router.get('/:slug/edit', function(req, res, next) {
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
 * UPDATE EVent
 */
router.post('/:slug/update', function(req, res, next) {
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
router.get('/:slug/signup', function(req, res, next) {
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
  .post(function(req, res) {
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


module.exports = router;
