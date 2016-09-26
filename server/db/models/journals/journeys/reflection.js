var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Reflection = sequelize.define('reflections', {
    entry: Sequelize.STRING(500),
    interface: Sequelize.STRING(10),
    datetime: Sequelize.DATE,
  });

  return Reflection;
};