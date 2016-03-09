var express = require('express');
var router = express.Router();

var db = require('mongoose');
var Events = db.model('Events');

/* GET users listing. */
router
  .get('/', function(req, res, next) {
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
  .post('/', function(req, res, next) {
    var event = new Events(req.body);
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
