var settings = (process.env.NODE_ENV === 'development' ? require('../../settings').dbDev : require('../../settings').dbProd);
var Sequelize = require('sequelize');

var sequelize = new Sequelize('journey', settings.username, settings.password, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false,
});

var User = require('./models/users/user')(sequelize);
var FacebookUser = require('./models/users/facebookUser')(sequelize);
var AmazonUser = require('./models/users/amazonUser')(sequelize);

var Address = require('./models/users/address')(sequelize);
var Interaction = require('./models/users/interaction')(sequelize);

var Note = require('./models/journals/note')(sequelize);
var ToDo = require('./models/journals/toDo')(sequelize);
var JournalEntry = require('./models/journals/JournalEntry')(sequelize);

var Gratitude = require('./models/journals/journeys/gratitude')(sequelize);
var Outlook = require('./models/journals/journeys/outlook')(sequelize);
var Affirmation = require('./models/journals/journeys/affirmation')(sequelize);
var Amazing = require('./models/journals/journeys/amazing')(sequelize);
var Reflection = require('./models/journals/journeys/reflection')(sequelize);

var Analysis = require('./models/analytics/analysis')(sequelize);

User.hasOne(FacebookUser);
FacebookUser.belongsTo(User, {foreignKey: 'userId'});

User.hasOne(AmazonUser);
AmazonUser.belongsTo(User, {foreignKey: 'userId'});

User.hasOne(Address);
Address.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Interaction, {as: 'Interactions', onDelete: 'cascade'});
Interaction.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Note, {as: 'Notes', onDelete: 'cascade'});
Note.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(ToDo, {as: 'ToDos', onDelete: 'cascade'});
ToDo.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Gratitude, {as: 'Gratitudes', onDelete: 'cascade'});
Gratitude.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Outlook, {as: 'Outlooks', onDelete: 'cascade'});
Outlook.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Affirmation, {as: 'Affirmations', onDelete: 'cascade'});
Affirmation.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Amazing, {as: 'Amazings', onDelete: 'cascade'});
Amazing.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Reflection, {as: 'Reflections', onDelete: 'cascade'});
Reflection.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Analysis, {as: 'Analyses', onDelete: 'cascade'});
Analysis.belongsTo(User, {foreignKey: 'userId'});

module.exports = {
  sequelize: sequelize,
  User: User,
  FacebookUser: FacebookUser,
  AmazonUser: AmazonUser,
  Address: Note,
  Interaction: Interaction,
  ToDo: ToDo,
  Gratitude: Gratitude,
  Outlook: Outlook,
  Affirmation: Affirmation,
  Amazing: Amazing,
  Reflection: Reflection,
  Note: Note,
  Analysis: Analysis,
  JournalEntry: JournalEntry
}