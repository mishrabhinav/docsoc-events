var db = require('mongoose');
var Schema = db.Schema;
var bcrypt = require('bcrypt');

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
                     organiser: {
                       type: Schema.Types.ObjectId,
                       ref: 'User'
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
                       required: true
                     },
                     name: {
                       type: String,
                       required: true
                     },
                     year: {
                       type: String,
                       required: true
                     }
                   });
db.model('SignUpUser', signUpSchema);


var userSchema =  new Schema({
                   shortcode: {
                     type: String,
                     unique: true
                   },
                   name: String,
                   password: String
                 });
var User = db.model('User', userSchema);

userSchema.methods.validPassword = function(passwd) {
  User.findOne({shortcode: this.shortcode})
      .select('password')
      .exec(function(err, user) {
        if(err) {
          console.log(err);
          return false;
        }
        bcrypt.compare(passwd, user.password, function(err, res){
          if(err) {
            console.log(err);
            return false;
          } else {
            return res == true;
          }
        })
      })
};

