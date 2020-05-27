var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const GOOGLE_CLIENT_ID ="1048507317343-nvfritcgv71asc4ld7lg4gt421grq42j.apps.googleusercontent.com"; //this is public so no need to hide it
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
async function verify(userIDVal) { //use this when logging in from react
  //https://developers.google.com/identity/sign-in/web/backend-auth read this again (watch video too)
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userID = payload['sub'];
  if ((payload['aud']==GOOGLE_CLIENT_ID)&&((payload['iss']=="https://accounts.google.com")||(payload['iss']=="accounts.google.com"))) {
    return userID;
  } else {
    return null;
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
