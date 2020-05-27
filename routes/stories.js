var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = "mongodb+srv://" + process.env.MONGODB_USER_RIVERMOUTH + ":" + process.env.MONGODB_PASS_RIVERMOUTH + "@rivermouth-rt5m7.mongodb.net/test?retryWrites=true&w=majority";
//mongodb://<dbuser>:<dbpassword>@ds141228.mlab.com:41228/heroku_jr7b7kv0
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var StorySchema = new Schema({
  userID: String,
  userType: String,
  title: String,
  storyString: String
});

// Compile model from schema
var StoryModel = mongoose.model('StoryModel', StorySchema );

var instance = new StoryModel({
  userID: "Romeno232323",
  userType: "google",
  title: "This is the title",
  storyString: "{}sdojodsjosdoiewdhoihewof}"
});

// Save the new model instance, passing a callback

/* GET users listing. */
router.get('/', function(req, res, next) {
  instance.save(function (err) {
    if (err) return handleError(err);
    res.send('saved');
  });

});

module.exports = router;
