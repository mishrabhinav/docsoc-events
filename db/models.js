var db = require('mongoose');
var Schema = db.Schema;

db.model('Events', new Schema({
  name: String,
  place: String,
  date: Date,
  description: String,
  organiser: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  } 
}));

db.model('User', new Schema({
  shortcode: String,
  name: String,
  password: String
}));
