module.exports = function(sequelize, User) {
  var UserController = require('./userController')(sequelize, User);

  return {
    UserController: UserController
  }
}