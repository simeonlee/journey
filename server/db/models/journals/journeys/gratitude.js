var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Gratitude = sequelize.define('gratitudes', {
    entry: Sequelize.STRING(500),
    interface: Sequelize.STRING(10),
    datetime: Sequelize.DATE,
  });

  return Gratitude;
};