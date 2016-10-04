var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Note = sequelize.define('notes', {
    note: Sequelize.STRING(1000),
    datetime: Sequelize.DATE,
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    }
  });

  return Note;
};