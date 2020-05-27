var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("1048507317343-nvfritcgv71asc4ld7lg4gt421grq42j.apps.googleusercontent.com");
async function verify(userIDVal) { //use this when logging in from react
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "1048507317343-nvfritcgv71asc4ld7lg4gt421grq42j.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userID = payload['sub'];
  if (userID==userIDVal) {
    return true;
  }
}
router.post('/', function(req, res, next) {
  //res.send('respond with a resource');
  const userID = req.body.userID;
  const user = { name: userID};

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({accessToken: accessToken});
});

module.exports = router;
