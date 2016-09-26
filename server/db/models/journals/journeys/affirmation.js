var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Affirmation = sequelize.define('affirmations', {
    entry: Sequelize.STRING(500),
    interface: Sequelize.STRING(10),
    datetime: Sequelize.DATE,
  });

  return Affirmation;
};