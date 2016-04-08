var express = require('express');
var router = express.Router();
var multer = require('multer');
var db = require('mongoose');
var Events = db.model('Events');
var SignUpUser = db.model('SignUpUser');

router.route('/:slug')
  .get(function(req, res){
    var query = Events.findOne({slug: req.params.slug}).select();
     query.exec(function(err, event){
       if(err) {
         res.status(500).json(err);
         return;
       } else {
         res.json(event);
       }
     });
   })
  .post(function(req, res){
    var update = {  slug: req.body.slug,
                    name: req.body.name,
                    place: req.body.place,
                    date: req.body.date,
                    description: req.body.description
                 }
    Events.findOneAndUpdate({slug: req.params.slug}, update, function(err, event){
      if(err) {
        res.status(500).json(err);
        return;
      } else {
        res.render(event);
      }
    });
  })
  .delete(function(req, res){
    Events.findOne({slug: req.params.slug}).remove(function(err){
      if(err) {
        res.status(500).json(err);
      }
    });
  });

router.route('/:slug/state')
  .get(function(req, res){
    Events.findOne({slug: req.params.slug}, function(err, event){
      if(err) {
        res.status(500).json(err);
        return;
      } else {
        res.json(event.signUpOpen);
      }
    });
  })
  .post(function(req, res){
    Events.findOneAndUpdate({slug: req.params.slug},
                             {$set: {signUpOpen: req.body.signUpOpen}},
                             function(err, event){
      if(err) {
        res.status(500).json(err);
        return;
      } else {
        res.json(event.signUpOpen);
      }
    });
  });

router.get('/:slug/picture', function(req, res){
  Events.findOne({slug: req.params.slug}, function(err, event){
    if(err) {
      res.status(500).json(err);
      return;
    } else {
      res.end(event.eventPhoto.data);
    }
  })
})

router.post('/:slug/signup', function(req, res){
  Events.findOneAndUpdate({slug: req.params.slug},{$push: {signUpList: new SignUpUser(req.body)}}, function(err, event) {
    if(err) {
      res.status(500).json(err);
      return;
    } else {
      res.json(event.signUpList);
    }
  });
});

module.exports = router;
