var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var StoryModel = require('../models/Story');
var mongoDB = "mongodb+srv://" + process.env.MONGODB_USER_RIVERMOUTH + ":" + process.env.MONGODB_PASS_RIVERMOUTH + "@rivermouth-rt5m7.mongodb.net/test?retryWrites=true&w=majority";
var shortid = require('shortid');

mongoose.connect(mongoDB, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


router.get('/:userID', function(req, res, next) { // Requesting for stories of a specific user by their userID

  StoryModel.find({
    userID: req.params.userID   // search query
  }).then(result => {
    res.json(result);
  }).catch(err => {
    res.send("Error.");
  })
});

router.post('/', function(req, res, next) { //Adding a new story

  let userID = req.body.userID;
  let title = req.body.title;
  let storyString = req.body.storyString;
  let storyID = shortid.generate();
  let newStory = new StoryModel({
    userID: userID,
    storyID: storyID,
    title: title,
    storyString: storyString
  });

  newStory.save().then(doc => {
      res.json(newStory);
   }).catch(err => {
     res.send("Error.");
   });

});

router.put('/', function(req, res, next) { //Updating a story

  let userID = req.body.userID;
  let title = req.body.title;
  let storyString = req.body.storyString;
  let storyID = req.body.storyID;
  StoryModel.findOneAndUpdate(
      {
        userID: userID,
        storyID: storyID
      },
      {
        title: title,
        storyString: storyString
      },
      {
        new: true,                       // return updated doc
        runValidators: true              // validate before update
      })
    .then(result => {
      res.send("Story id is: " + storyID + " --- userID: " + userID);
      //res.json(result);
    })
    .catch(err => {
      res.send("Error");
    })
});

router.delete('/:storyID', function(req, res, next) { // deleting a story
  let storyID = req.params.storyID;
  StoryModel.findOneAndRemove({
      storyID: storyID
    })
    .then(response => {
      res.json({
        storyID: storyID,
        success: "true ---" + storyID + "--"
      });
    })
    .catch(err => {
      res.json({
        success: "false" + err
      });
    })
});

module.exports = router;
