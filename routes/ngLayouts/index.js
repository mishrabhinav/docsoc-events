var express = require('express');
var router = express.Router();
var app = express();

router.get('/:page', function(req, res, next){
  res.render('ngLayouts/' + req.params.page);
})

module.exports = router;
