let mongoose = require('mongoose')
//let validator = require('validator')
var Schema = mongoose.Schema;

var StorySchema = new Schema({
  userID: String,
  title: String,
  storyString: String
});

module.exports = mongoose.model('Story', StorySchema );
