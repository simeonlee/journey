var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var JournalEntry = sequelize.define('journalentry', {
    morning: Sequelize.STRING,
    evening: Sequelize.STRING,
    morningCount: Sequelize.INTEGER,
    eveningCount: Sequelize.INTEGER,
    datetime: Sequelize.DATE,
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    }
  });

  return JournalEntry;
};