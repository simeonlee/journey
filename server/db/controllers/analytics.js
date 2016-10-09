module.exports = (() => {
  var config = require('../config');

  // var models = {
  //   User: config.User,
  //   Gratitude: config.Gratitude,
  //   Outlook: config.Outlook,
  //   Affirmation: config.Affirmation,
  //   Amazing: config.Amazing,
  //   Reflection: config.Reflection
  // };

  // var User = config.User;
  var models = [
    config.Gratitude,
    config.Outlook,
    config.Affirmation,
    config.Amazing,
    config.Reflection
  ];
  // var types = ['Gratitude', 'Outlook', 'Affirmation', 'Amazing', 'Reflection'];

  // Data indexing plan:
  // If the user logged in that day, at 4am the next day run the analysis

  var getAllUserJournalEntries = (req, res) => {

    var data = {};

    var userId = req.user.id /* Amazon */ || req.user.dataValues.id /* Facebook */;

    // models.forEach(model => {
    //   model.findAll({
    //       where: {
    //         userId: userId
    //         // userId: user.dataValues.id
    //       }
    //     })
    //     .then(entries => {
    //       entries && entries.forEach((entry) => {
    //         data[model] = data[model] || [];
    //         data[model].push(entry.dataValues);
    //       })
    //       // console.log('===> entries', entries);
    //       console.log('===> data', data);
    //     })
    // });




    // var findDataPromises = [];
    // findDataPromises.push(

    var findDataPromises = models.map(model => {
      return model.findAll({
          where: {
            userId: userId
            // userId: user.dataValues.id
          }
        })
        .then(entries => {
          entries && entries.forEach((entry) => {
            data[model] = data[model] || [];
            data[model].push(entry.dataValues);
          })
        })
    });



      // Model.find().then( function (models) {
      //   for (var i = 0; i < models.length; i++) {
      //      findDataPromises.push( AnotherModel.find({ model_id : models[i].id }) ).then ( function (another_model) {
      //         another_model.counter++;
      //      })
      //   } //for
      // }) // model find then
    // )

    Promise.all(findDataPromises).then(function() {
      console.log('===> data', data);
      console.log("===> all the findDataPromises were fulfilled");
    });

  }



  return {
    getAllUserJournalEntries: getAllUserJournalEntries
  }
})();