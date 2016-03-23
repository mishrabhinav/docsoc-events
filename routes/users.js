var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var db = require('mongoose');
var User = db.model('User');

router.route('/')
  .get(function(req, res) {
    var query = User.find({}).select();
    query.exec(function(err, users) {
      if(err) {
        res.status(500).json(err);
        return;
      } else {
        res.json(users);
      }
    })
  })
  .post(function(req, res) {
    User.register(new User({username: req.body.username, name: req.body.name}),
                   req.body.password, function(err, user){
                     if(err) {
                       res.status(500).json(err);
                     } else {
                       res.render('events', {title: 'DoCSoc | Events'});
                     }
                   })
 })

module.exports = router;
