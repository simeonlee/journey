var passport = require('passport');

var checkForFacebookUser = (req, res) => {
  console.log('REQUEST USER ========> ', req.user);
  res.send(req.user);
}

module.exports = {
  checkForFacebookUser: checkForFacebookUser
}