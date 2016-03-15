var express = require('express');
var router = express.Router();

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

module.exports = router;
