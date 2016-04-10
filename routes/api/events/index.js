var express = require('express');
var router = express.Router();
var app = express();
var multer = require('multer');
var db = require('mongoose');
var Events = db.model('Events');
var SignUpUser = db.model('SignUpUser');
var passport = require('passport');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads/')
  },
  filename: function (req, file, cb) {
    var ext = require('path').extname(file.originalname);
    ext = ext.length>1 ? ext : "." + require('mime').extension(file.mimetype);
    cb(null, req.body.slug + ext); 
  }
})

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
  .post(multer({storage: storage}).single('eventPhoto'), function(req, res) {
    var entry = req.body;
    entry.slug = entry.slug.split(' ').join('-');
    var event = new Events(entry);
    if(req.file) {
      event.hasCover = true;
      var ext = require('path').extname(req.file.originalname);
      ext = ext.length>1 ? ext : "." + require('mime').extension(req.file.mimetype);
      event.eventPhoto = '/images/uploads/' + req.body.slug + ext;
    }
    //} else {
    //  var imgDir = path.join(__dirname, 'public', 'images');
    //  var imgNames = 'default.png';
    //  event.picture.data = fs.readFileSync(path.join(imgDir, imgNames));
    //  event.picture.contentType = 'image/png';
    //}
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
