var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Address = sequelize.define('addresses', {
    type: Sequelize.STRING(15), // shipping or billing
    streetAddressOne: Sequelize.STRING(50),
    streetAddressTwo: Sequelize.STRING(50),
    city: Sequelize.STRING(50),
    state: Sequelize.STRING(50),
    zip: Sequelize.STRING(20),
    country: Sequelize.STRING(50)
  });

  return Address;
};