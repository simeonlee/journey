var settings = require('../../settings').db;
var Sequelize = require('sequelize');

var sequelize = new Sequelize('journey', settings.username, settings.password, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false,
});

var User = require('./models/users/user')(sequelize);
var Address = require('./models/users/address')(sequelize);
var Interaction = require('./models/users/interaction')(sequelize);

var Note = require('./models/journals/note')(sequelize);
var ToDo = require('./models/journals/toDo')(sequelize);

var Gratitude = require('./models/journals/journeys/gratitude')(sequelize);
var Outlook = require('./models/journals/journeys/outlook')(sequelize);
var Affirmation = require('./models/journals/journeys/affirmation')(sequelize);
var Amazing = require('./models/journals/journeys/amazing')(sequelize);
var Reflection = require('./models/journals/journeys/reflection')(sequelize);


var UserController = User.User;

// Address.belongsTo(UserController);
// Interaction.belongsTo(UserController, {foreignKey: 'id'});

UserController.hasMany(Note, {as: 'Notes', onDelete: 'cascade'});
Note.belongsTo(UserController);

UserController.hasMany(ToDo, {as: 'ToDos', onDelete: 'cascade'});
ToDo.belongsTo(UserController);

UserController.hasMany(Gratitude, {as: 'Gratitudes', onDelete: 'cascade'});
Gratitude.belongsTo(UserController);

UserController.hasMany(Outlook, {as: 'Outlooks', onDelete: 'cascade'});
Outlook.belongsTo(UserController);

UserController.hasMany(Affirmation, {as: 'Affirmations', onDelete: 'cascade'});
Affirmation.belongsTo(UserController);

UserController.hasMany(Amazing, {as: 'Amazings', onDelete: 'cascade'});
Amazing.belongsTo(UserController);

UserController.hasMany(Reflection, {as: 'Reflections', onDelete: 'cascade'});
Reflection.belongsTo(UserController);



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
      entry: 'test gratitude, please ignore',
      interface: 'que?'
    }).then(gratitude => {
      user.setGratitudes(gratitude);
    })
    Amazing.create({
      entry: 'test amazing, please ignore',
      interface: 'que?'
    }).then(amazing => {
      user.setAmazings(amazing);
    })
    Affirmation.create({
      entry: 'test affirmation, please ignore',
      interface: 'que?'
    }).then(affirmation => {
      user.setAffirmations(affirmation);
    })
    Outlook.create({
      entry: 'test outlook, please ignore',
      interface: 'que?'
    }).then(outlook => {
      user.setOutlooks(outlook);
    })
    Reflection.create({
      entry: 'test reflection, please ignore',
      interface: 'que?'
    }).then(reflection => {
      user.setReflections(reflection);
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