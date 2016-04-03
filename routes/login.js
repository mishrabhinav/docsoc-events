var express = require('express');
var router = express.Router();
var passport = require('passport');

/* 
 * GET login page. 
 */
router.get('/', function(req, res, next) {
  res.render('login');
});

/*
 * POST login page.
 */
router.post('/', function(req, res){
  res.redirect('/manage');
});


router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
