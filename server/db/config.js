var settings = require('../../settings').db;
var Sequelize = require('sequelize');

var sequelize = new Sequelize('Journey', settings.username, settings.password, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false,
});

var Address = require('./models/users/address')(sequelize);
var Interaction = require('./models/users/interaction')(sequelize);

var Note = require('./models/journals/note')(sequelize);
var ToDo = require('./models/journals/toDo')(sequelize);

var Gratitude = require('./models/journals/journeys/gratitude')(sequelize);
var Outlook = require('./models/journals/journeys/outlook')(sequelize);
var Affirmation = require('./models/journals/journeys/affirmation')(sequelize);
var Amazing = require('./models/journals/journeys/amazing')(sequelize);
var Reflection = require('./models/journals/journeys/reflection')(sequelize);

var User = require('./models/users/user')(sequelize, Affirmation.Affirmation, Amazing.Amazing, Gratitude.Gratitude, Outlook.Outlook, Reflection.Reflection);

Address.belongsTo(User, {foreignKey: 'userId'});
Interaction.belongsTo(User, {foreignKey: 'userId'});

Note.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Note, {as: 'Notes'});

ToDo.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(ToDo, {as: 'ToDos'});

Gratitude.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Gratitude, {as: 'Gratitudes'});

Outlook.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Outlook, {as: 'Outlooks'});

Affirmation.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Affirmation, {as: 'Affirmations'});

Amazing.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Amazing, {as: 'Amazings'});

Reflection.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Reflection, {as: 'Reflections'});

module.exports = sequelize;