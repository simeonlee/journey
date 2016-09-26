var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Interaction = sequelize.define('interactions', {
    type: Sequelize.STRING(15), // Alexa, web or mobile
    datetime: Sequelize.DATE
  });

  return Interaction;
};