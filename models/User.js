let mongoose = require('mongoose')
//let validator = require('validator')
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userID: String,
  name: String,
  token: String,
  email: String
});

module.exports = mongoose.model('Users', UserSchema );
