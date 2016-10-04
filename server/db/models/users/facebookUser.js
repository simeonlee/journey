var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var FacebookUser = sequelize.define('facebookUser', {
    facebookID: {
      type: Sequelize.STRING(20),
      unique: true
    },
    age_range: Sequelize.INTEGER(3),
    link: Sequelize.STRING(80),
    picture: Sequelize.STRING(200),
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    }
  });
  return FacebookUser;
};


// { id: '10153900943292227',
//   name: 'Connor Chevli',
//   last_name: 'Chevli',
//   first_name: 'Connor',
//   email: 'connorch@buffalo.edu',
//   gender: 'male',
//   age_range: { min: 21 },
//   link: 'https://www.facebook.com/app_scoped_user_id/10153900943292227/',
//   picture:
//    { data:
//       { is_silhouette: false,
//         url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13692749_10153717845727227_6808228327020457045_n.jpg?oh=488264acd7faba41028c87a106f5ff94&oe=58681CA1' } },
//   locale: 'en_US',
//   timezone: -7,
//   updated_time: '2016-09-28T17:31:28+0000',
//   verified: true }