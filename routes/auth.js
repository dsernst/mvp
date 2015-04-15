var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/github',
  require('../controllers/auth.js').authenticateWithGitHub,
  function () {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
    console.log('I\'m a pastry');
  });

router.get('/github/callback',
  require('../controllers/auth.js').authenticateWithGitHub,
  function (req, res) {
    console.log('Authenticated successfully');
    res.redirect('/#/success');
  });

module.exports = router;
