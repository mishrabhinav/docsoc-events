var db = require('mongoose');
var Schema = db.Schema;

db.model('Events', new Schema({
  name: String,
  place: String,
  date: Date 
}));
