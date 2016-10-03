var passport = require('passport');

var checkForFacebookUser = (req, res) => {
  res.send(req.user);
}

module.exports = {
  checkForFacebookUser: checkForFacebookUser
}