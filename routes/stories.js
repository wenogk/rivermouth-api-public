var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var StoryModel = require('../models/Story');
var mongoDB = "mongodb+srv://" + process.env.MONGODB_USER_RIVERMOUTH + ":" + process.env.MONGODB_PASS_RIVERMOUTH + "@rivermouth-rt5m7.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoDB, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.get('/:userID', function(req, res, next) { // Requesting for stories of a specific user by their userID
res.send('user id is ' + req.params.userID);
});

router.post('/', function(req, res, next) { //Adding a new story
  let newStory = new StoryModel({
    userID: "Romenonew0000google",
    title: "This is the fffsfd",
    storyString: "{}albert}"
  });
  newStory.save().then(doc => {
      res.json(newStory);
   }).catch(err => {
     res.send(err)
   });

});

module.exports = router;
