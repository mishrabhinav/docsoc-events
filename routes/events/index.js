var express = require('express');
var router = express.Router();
var multer = require('multer');
var db = require('mongoose');
var Events = db.model('Events');
var SignUpUser = db.model('SignUpUser');
var passport = require('passport');

/*
 * Initialize Multer
 */
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, '/images/uploads');
  },
  filename: function(req, file, callback){
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({storage: storage}).single('eventPhoto');

/*
 * GET Home page.
 */
router.get('/', function(req, res, next) {
  res.render('container');
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

module.exports = router;
