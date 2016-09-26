var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Note = sequelize.define('notes', {
    note: Sequelize.STRING(1000),
    datetime: Sequelize.DATE
  });

  return Note;
};