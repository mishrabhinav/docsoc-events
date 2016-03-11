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
    var userData =  req.body;
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(userData.password, salt, function(err, hash) {
        userData.password = hash;
        var newUser = new User(userData);
        newUser.save(function(err) {
          if(err) {
            res.status(500).json(err);
          } else {
            res.redirect('/');
          }
        })
      })
    })
  })

module.exports = router;
