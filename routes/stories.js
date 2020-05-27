var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var mongoDB = "mongodb+srv://" + process.env.MONGODB_USER_RIVERMOUTH + ":" + process.env.MONGODB_PASS_RIVERMOUTH + "@rivermouth-rt5m7.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoDB, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var StorySchema = new Schema({
  userID: String,
  userType: String,
  title: String,
  storyString: String
});

var StoryModel = mongoose.model('StoryModel', StorySchema );

var instance = new StoryModel({
  userID: "Romeno232323",
  userType: "google",
  title: "This is the title",
  storyString: "{}sdojodsjosdoiewdhoihewof}"
});


router.get('/', function(req, res, next) {
  instance.save(function (err) {
    if (err) return handleError(err);
    res.send('saved');
  });


router.get('/', function(req, res, next) {
    instance.save(function (err) {
      if (err) return handleError(err);
      res.send('saved');
    });

});

module.exports = router;
