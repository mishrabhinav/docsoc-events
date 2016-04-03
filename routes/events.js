var express = require('express');
var router = express.Router();
var multer = require('multer');
var db = require('mongoose');
var Events = db.model('Events');
var SignUpUser = db.model('SignUpUser');
var passport = require('passport');

/*
 * Initialize Multer
 */
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, '/images/uploads');
  },
  filename: function(req, file, callback){
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({storage: storage}).single('eventPhoto');

/*
 * GET Home page.
 */
router.get('/', function(req, res, next) {
  res.render('container');
});

router.get('/events', function(req, res, next) {
  res.render('partials/events');
});
/*
 * GET Manage page.
 */
router.get('/manage', function(req, res, next) {
  res.render('partials/manage');
});

/*
 * GET Post page.
 */
router.get('/post', function(req, res, next) {
  res.render('partials/post');
});

/*
 * GET Single Event
 */
router.get('/event', function(req, res, next) {
  res.render('partials/event');
});

router.get('/edit', function(req, res, next) {
  res.render('partials/edit');
});

/*
 * UPDATE Event
 */
router.post('/events/:slug/update', function(req, res, next) {
  var update = {slug: req.body.slug,
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
      event.title = 'DoCSoc | ' + event.name;
      res.render('event', event);
    }
  });
});

/*
 * Event Sign Up Page
 */
router.get('/signup', function(req, res, next) {
  res.render('partials/signup');
});

/*
 * API Routes
 */
router.route('/api/events')
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

/*
 * GET, UPDATE and DELETE slug Event
 */
router.route('/api/events/:slug')
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

/*
 * Merge Sign Up ends.
 */
router.route('/api/events/:slug/state')
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

/*
 * POST Sign Up LIst
 */
router.post('/api/events/:slug/signup', function(req, res){
  Events.findOneAndUpdate({slug: req.params.slug},{$push: {signUpList: new SignUpUser(req.body)}}, function(err, event) {
    if(err) {
      res.status(500).json(err);
      return;
    } else {
      res.json(event.signUpList);
    }
  });
});

/*
 * GET Event Image
 */
router.get('/api/events/:slug/picture', function(req, res){
  Events.findOne({slug: req.params.slug}, function(err, event){
    if(err) {
      res.status(500).json(err);
      return;
    } else {
      res.end(event.eventPhoto.data);
    }
  })
})

module.exports = router;
