var db = require('mongoose');
var Schema = db.Schema;
var bcrypt = require('bcrypt');

var eventSchema =  new Schema({
                     name: String,
                     place: String,
                     date: Date,
                     description: String,
                     organiser: {
                       type: Schema.Types.ObjectId,
                       ref: 'User'
                     }
                   });
db.model('Events', eventSchema);

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

