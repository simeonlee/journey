var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Amazing = sequelize.define('amazings', {
    entry: Sequelize.STRING(500),
    interface: Sequelize.STRING(10),
    datetime: Sequelize.DATE,
  });

  return Amazing;
};