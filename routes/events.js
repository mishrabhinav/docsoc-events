var express = require('express');
var router = express.Router();

var db = require('mongoose');
var Events = db.model('Events');

router.route('/')
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
