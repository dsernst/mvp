var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
  console.log(req.undefined);
  res.send('keyboard cat ftw');
});

router.get('/:username', function (req, res) {
  var User = require('../db/users');
  User.findOne({username: req.params.username}, function (error, user) {
    if (error) {
      return error;
    }

    if (!user) {
      return res.status(404);
    }

    console.log((user.toJSON().profile));

    res.send(user);
  });
});

module.exports = router;
