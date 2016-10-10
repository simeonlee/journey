module.exports = (() => {
  var config = require('../config');

  var models = [
    config.Gratitude,
    config.Outlook,
    config.Affirmation,
    config.Amazing,
    config.Reflection
  ];

  // Data indexing plan:
  // If the user logged in that day, at 4am the next day run the analysis
  // 

  var getAllUserJournalEntries = (req, res) => {
    var data = {};
    var userId = req.user.id /* Amazon */ || req.user.dataValues.id /* Facebook */;


    // Get an iterable array of promises
    // http://bluebirdjs.com/docs/api/promise.all.html
    var findDataPromises = models.map(model => {
      return model.findAll({
          where: {
            userId: userId
          }
        })
        .then(entries => {
          // Get the name of the model type from the model object
          // to use as a key in the data storage object for easier ID
          var str = model.toString();
          var start = str.indexOf(':') + 1;
          var end = str.indexOf(']');
          var modelKey = str.slice(start, end);

          // Push the entries to the data object
          entries && entries.forEach((entry) => {
            data[modelKey] = data[modelKey] || [];
            data[modelKey].push(entry.dataValues);
          })
        })
    });

    // When all promises are fulfilled, then we know our data object is full
    Promise.all(findDataPromises)
      .then(() => {
        // console.log('===> data', data);
        // Run Google Cloud NLP code to analyze user journal
        require('../../analytics/analytics')(req, res, data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  var saveAnalyzedTextResults = (req, res, dictionary) => {
    var userId = req.user.id /* Amazon */ || req.user.dataValues.id /* Facebook */;



    var json = JSON.stringify(dictionary);
    console.log('=====> dictionary');
    console.log(dictionary);
    // var blob = new Blob([json], {type: 'application/json'});
    let buffer = Buffer.from(json);
    console.log('=====> buffer');
    console.log(buffer);
    let arrayBuffer = Uint8Array.from(buffer).buffer;
    console.log('=====> arrayBuffer');
    console.log(arrayBuffer);



    config.Analysis.create({
        analysis: buffer,
        userId: userId
      })
      .then(analysis => {
        console.log('Analysis saved to database!');
        console.log(analysis);
      })

    config.Analysis.findAll({
        where: {
          userId: userId
        }
      })
      .then(analyses => {
        console.log('Found analyses in database!');
        console.log(analyses);
      })


    var newjson = JSON.parse(buffer.toString());
    // var newjson = JSON.parse(JSON.stringify(buffer.toString()).replace(/\\/g, ''));
    console.log('=====> converted back to json');
    console.log(newjson);
  }

  return {
    getAllUserJournalEntries: getAllUserJournalEntries,
    saveAnalyzedTextResults: saveAnalyzedTextResults
  }
})();