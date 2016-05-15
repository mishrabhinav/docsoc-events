var db = require('mongoose');
var Schema = db.Schema;
var passportLocal = require('passport-local-mongoose');

var eventSchema =  new Schema({
                     slug: {
                       type: String,
                       required: true,
                       unique: true
                     },
                     name: {
                       type: String,
                       required: true
                     },
                     place: {
                       type: String,
                       required: true
                     },
                     date: {
                       type: Date,
                       required: true
                     },
                     description: String,
                     eventPhoto: {
                       type: String
                     },
                     hasCover : {
                       type: Boolean,
                     default: false
                     },
                     organiser: {
                       type: Schema.Types.ObjectId,
                       ref: 'User'
                     },
                     layout: {
                       type: String,
                       default: 'vertical' 
                     },
                     signUpOpen: {
                       type: Boolean,
                       default: false 
                     },
                     signUpList: [{
                       type: Schema.Types.ObjectId,
                       ref: 'SignUpUser'
                     }]
                   });
db.model('Events', eventSchema);

var signUpSchema = new Schema({
                     shortcode: {
                       type: String,
                       unique: true,
                       required: true
                     },
                     name: {
                       type: String,
                       unique: true,
                       required: true
                     },
                     year: {
                       type: String,
                       unique: true,
                       required: true
                     }
                   });
var SignUpUser = db.model('SignUpUser', signUpSchema);


var userSchema =  new Schema({
                   username: {
                     type: String,
                     unique: true
                   },
                   name: String,
                   password: String
                 });

userSchema.plugin(passportLocal);
var User = db.model('User', userSchema);
