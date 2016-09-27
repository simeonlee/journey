var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var ToDo = sequelize.define('toDos', {
    toDo: Sequelize.STRING(1000),
    datetime: Sequelize.DATE
  });

  return ToDo;
};