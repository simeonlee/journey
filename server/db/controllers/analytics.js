module.exports = (() => {
  var config = require('../config');
  var User = config.User;
  var Gratitude = config.Gratitude;
  var Outlook = config.Outlook;
  var Affirmation = config.Affirmation;
  var Amazing = config.Amazing;
  var Reflection = config.Reflection;

  var getAllUserJournalEntries = (req, res) => {

  }

  return {
    getAllUserJournalEntries: getAllUserJournalEntries
  }
})();