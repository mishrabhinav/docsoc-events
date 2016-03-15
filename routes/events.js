var express = require('express');
var router = express.Router();

/*
 * GET Home page.
 */
router.get('/', function(req, res, next) {
  res.render('events');
});

/* 
 * GET Manage page.
 */
router.get('/manage', function(req, res, next) {
  res.render('manage');
});

/*
 * GET Post page.
 */
router.get('/post', function(req, res, next) {
  res.render('post');
});

module.exports = router;
