var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'DoCSoc | Login' });
});

router.get('/logout', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
