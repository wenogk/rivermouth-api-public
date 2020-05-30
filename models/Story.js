let mongoose = require('mongoose')
//let validator = require('validator')
var Schema = mongoose.Schema;

var StorySchema = new Schema({
  userID: String,
  storyID: String,
  title: String,
  storyString: String,
  published: Boolean,
  lastSaveTime: String
});

module.exports = mongoose.model('Story', StorySchema );
