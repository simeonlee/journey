var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Outlook = sequelize.define('outlooks', {
    entry: Sequelize.STRING(500),
    interface: Sequelize.STRING(10),
    datetime: Sequelize.DATE,
  });

  return Outlook;
};