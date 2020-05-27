var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ um : "why are you here?"});
});

module.exports = router;
