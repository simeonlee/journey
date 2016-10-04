var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var ToDo = sequelize.define('toDos', {
    toDo: Sequelize.STRING(1000),
    datetime: Sequelize.DATE,
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    }
  });

  return ToDo;
};