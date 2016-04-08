var express = require('express');
var router = express.Router();
var app = express();
var multer = require('multer');
var db = require('mongoose');
var Events = db.model('Events');
var SignUpUser = db.model('SignUpUser');
var passport = require('passport');

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
  .post(multer().single('eventPhoto'), function(req, res) {
    var entry = req.body;
    entry.slug = entry.slug.split(' ').join('-');
    var event = new Events(entry);
    if(req.file) {
      event.eventPhoto.contentType = req.file.mimetype;
      event.eventPhoto.data = req.file.buffer;
    } else {
      var imgDir = path.join(__dirname, 'public', 'images');
      var imgNames = 'default.png';
      event.picture.data = fs.readFileSync(path.join(imgDir, imgNames));
      event.picture.contentType = 'image/png';
    }
    event.save(function(err){
      if(err) {
	res.status(500).json(err);
	return;
      } else {
	res.redirect('/');
      }
    });
  })

router.use('/', require('./slug'));

module.exports = router;
