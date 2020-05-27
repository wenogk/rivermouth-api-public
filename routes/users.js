var express = require('express');
var router = express.Router();

var mongoDB = "mongodb+srv://" + process.env.MONGODB_USER_RIVERMOUTH + ":" + process.env.MONGODB_PASS_RIVERMOUTH + "@rivermouth-rt5m7.mongodb.net/test?retryWrites=true&w=majority";
var shortid = require('shortid');

mongoose.connect(mongoDB, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});




module.exports = router;
