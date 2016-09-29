var settings = require('../../settings').db;
var Sequelize = require('sequelize');

var sequelize = new Sequelize('journey', settings.username, settings.password, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false,
});

var User = require('./models/users/user')(sequelize);
var FacebookUser = require('./models/users/facebookUser')(sequelize);
var Address = require('./models/users/address')(sequelize);
var Interaction = require('./models/users/interaction')(sequelize);

var Note = require('./models/journals/note')(sequelize);
var ToDo = require('./models/journals/toDo')(sequelize);

var Gratitude = require('./models/journals/journeys/gratitude')(sequelize);
var Outlook = require('./models/journals/journeys/outlook')(sequelize);
var Affirmation = require('./models/journals/journeys/affirmation')(sequelize);
var Amazing = require('./models/journals/journeys/amazing')(sequelize);
var Reflection = require('./models/journals/journeys/reflection')(sequelize);

FacebookUser.belongsTo(User, {foreignKey: 'userId'});
User.hasOne(FacebookUser);

Address.belongsTo(User, {foreignKey: 'userId'});
Interaction.belongsTo(User, {foreignKey: 'userId'});

Note.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Note);

ToDo.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(ToDo);

Gratitude.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Gratitude);

Outlook.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Outlook);

Affirmation.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Affirmation);

Amazing.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Amazing);

Reflection.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Reflection);

module.exports = {
  sequelize: sequelize,
  User: User,
  FacebookUser: FacebookUser,
  Address: Note,
  Interaction: Interaction,
  ToDo: ToDo,
  Gratitude: Gratitude,
  Outlook: Outlook,
  Affirmation: Affirmation,
  Amazing: Amazing,
  Reflection: Reflection
};
