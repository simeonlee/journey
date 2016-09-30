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

var UserController = User.User;

Address.belongsTo(UserController, {foreignKey: 'userId'});
Interaction.belongsTo(UserController, {foreignKey: 'userId'});

Note.belongsTo(UserController, {foreignKey: 'userId'});
UserController.hasMany(Note, {as: 'Notes'});

ToDo.belongsTo(UserController, {foreignKey: 'userId'});
UserController.hasMany(ToDo, {as: 'ToDos'});

Gratitude.belongsTo(UserController, {foreignKey: 'userId'});
UserController.hasMany(Gratitude, {as: 'Gratitudes'});

Outlook.belongsTo(UserController, {foreignKey: 'userId'});
UserController.hasMany(Outlook, {as: 'Outlooks'});

Affirmation.belongsTo(UserController, {foreignKey: 'userId'});
UserController.hasMany(Affirmation, {as: 'Affirmations'});

Amazing.belongsTo(UserController, {foreignKey: 'userId'});
UserController.hasMany(Amazing, {as: 'Amazings'});

Reflection.belongsTo(UserController, {foreignKey: 'userId'});
UserController.hasMany(Reflection, {as: 'Reflections'});



sequelize.sync({force: true})
.then(function() {
  UserController.create({
    username: 'Akai',
    password: 'yumyum',
    email: 'fakemail@sofake.com',
    phone: '8888888888',
    firstName: 'Akai',
    lastName: 'Senghor',
    age: 23,
    gender: 'male',
    bio: 'what dis',
    website: 'http://www.akaidasbest.com',
    job: 'software engineer',
    industry: 'software',
    employer: 'none',
    wantsEmails: false,
    wantsTexts: false,
  })
  .then(user => {
    Gratitude.create({
      entry: 'test entry, please ignore',
      interface: 'que?'
    }).then(gratitude => {
      //user.setGratitudes(gratitude);
    })
  })
})




module.exports = {
  sequelize: sequelize,
  Gratitude: Gratitude,
  Outlook: Outlook,
  Affirmation: Affirmation,
  Amazing: Amazing,
  Reflection: Reflection,
  Note: Note,
  ToDo: ToDo,
  User: User
}