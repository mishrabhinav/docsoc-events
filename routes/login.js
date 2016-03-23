var express = require('express');
var router = express.Router();
var passport = require('passport');

/* 
 * GET login page. 
 */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'DoCSoc | Login' });
});

/*
 * POST login page.
 */
router.post('/', passport.authenticate('local'), function(req, res){
  res.redirect('/manage');
})


router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
