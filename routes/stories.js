var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var StoryModel = require('../models/Story');
var mongoDB = "mongodb+srv://" + process.env.MONGODB_USER_RIVERMOUTH + ":" + process.env.MONGODB_PASS_RIVERMOUTH + "@rivermouth-rt5m7.mongodb.net/test?retryWrites=true&w=majority";
var shortid = require('shortid');
var jwt = require('jsonwebtoken');
mongoose.connect(mongoDB, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function authenticate(req, res, next) {
  const token = req.headers['authorization'];
//  const token = authHeader && authHeader.split(' ')[1];
  if(token == null) {
    res.send("header--->"+authHeader); //sendStatus(401).
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=> {
    if(err) {
      res.sendStatus(403);
    }
    req.userID = user.name
    next();
  })
}

router.get('/', authenticate, function(req, res, next) { // Requesting for stories of a specific user by their userID
  StoryModel.find({
    userID: req.userID  // search query
  }).then(result => {
    res.json(result);
  }).catch(err => {
    res.send("Error.");
  })
});

router.get('/:storyID', authenticate, function(req, res, next) { // Requesting for stories of a specific user by their userID
  let storyID = req.params.storyID;
  StoryModel.find({
    userID: req.userID,  // search query
    storyID: storyID
  }).then(result => {
    res.json(result);
  }).catch(err => {
    res.send("Error.");
  })
});

router.post('/', authenticate, function(req, res, next) { //Adding a new story

  let userID = req.userID;
  let title = req.body.title;
  let storyString = req.body.storyString;
  let storyID = shortid.generate();
  let lastSaveTime = Date.now();
  let newStory = new StoryModel({
    userID: userID,
    storyID: storyID,
    title: title,
    storyString: storyString,
    published: true,
    lastSaveTime: lastSaveTime
  });

  newStory.save().then(doc => {
      res.json(newStory);
   }).catch(err => {
     res.send("Error.");
   });

});

router.put('/', authenticate, function(req, res, next) { //Updating a story

  let userID = req.userID;
  let title = req.body.title;
  let storyString = req.body.storyString;
  let storyID = req.body.storyID;
  let published = (req.body.published==="true") ? true : false;
  let lastSaveTime = Date.now();
  StoryModel.findOneAndUpdate(
      {
        userID: userID,
        storyID: storyID
      },
      {
        title: title,
        storyString: storyString,
        published: published,
        lastSaveTime: lastSaveTime
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

router.delete('/:storyID', authenticate, function(req, res, next) { // deleting a story
  let storyID = req.params.storyID;
  StoryModel.findOneAndRemove({
      storyID: storyID,
      userID: req.userID
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
