var express = require('express');
var router = express.Router();


router.post('/', function(req, res, next) {
  //res.send('respond with a resource');
  const userID = req.body.userID;
  const user = { name: userID};

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({accessToken: accessToken});
});

module.exports = router;
