module.exports = (() => {
  var moment = require('moment');
  var config = require('../config');
  var models = [
    config.Gratitude,
    config.Outlook,
    config.Affirmation,
    config.Amazing,
    config.Reflection
  ];

  // Only run our text analysis and use API call if it has been more than 12 hours since we last ran this analysis
  var analyzeDays = (req, res) => {
    var userId = req.user.id /* Amazon */ || req.user.dataValues.id /* Facebook */;

    config.User.find({
        where: {
          id: userId
        }
      })
      .then(user => {
        // get the last time we crunched text through Google NLP API
        var timeOfLastAnalysis = user.dataValues.timeOfLastAnalysis || 0;
        var lastTime = moment(timeOfLastAnalysis).valueOf();
        
        // We want to make sure it was more than 12 hours ago
        var hoursAgo = '12:00:00'; // hh:mm:ss
        var hoursAgoParts = hoursAgo.split(':');
        var hourDelta = hoursAgoParts[0];

        var twelveHoursAgo = moment().subtract({ hours: hourDelta }).valueOf(); // .valueOf converts to milliseconds

        // if it has been 12 hours since the last time the user had analysis run
        // or if the user (such as developer) has ability to override, run analysis
        if (lastTime < twelveHoursAgo || req.body.override) {

          // when we save data to the database for the user's journal, also update the days that need to be analyzed
          // at certain intervals, we'll check that list of days to be analyzed and run analysis over them
          var days = JSON.parse(user.dataValues.daysToBeAnalyzed.toString()); // converted from buffer format to object of date:true key value pairs

          Object.keys(days).forEach(day => {
            var datetime = moment(day).startOf('day');
            delete days[day]; // delete the day to be updated from the dates object for storage back in user table
            var params = {
              userId: userId,
              datetime: datetime // find for each particular day that we need to analyze
            };
            var retrieveJournalEntries = new Promise((resolve, reject) => {
              var data = {};

              // Get an iterable array of promises
              // http://bluebirdjs.com/docs/api/promise.all.html
              var findDataPromises = models.map(model => {
                return model.findAll({
                    where: params
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
                  resolve(data);
                  // Run Google Cloud NLP code to analyze user journal
                }, err => {
                  reject(err);
                });
            });

            retrieveJournalEntries // promise to find all journal entries for that particular day
              .then(data => {
                var analyzeJournalEntries = new Promise((resolve, reject) => {
                  require('../../analytics/analytics')(resolve, reject, data);

                });

                analyzeJournalEntries // run that day's journal entries through Google NLP analysis
                  .then(dictionary => {
                    saveTextAnalysis(req, res, datetime, dictionary);
                  }, err => {
                    console.log(err);
                  });

                // console.log(result); // "Stuff worked!"
              }, err => {
                console.log(err); // Error: "It broke"
              });
          })

          config.User.update({
            timeOfLastAnalysis: moment(), // update time of last analysis for this moment
            daysToBeAnalyzed: Buffer.from(JSON.stringify(days)) // update days to be analyzed in user table
          }, {
            where: {
              id: userId
            }
          });

          res.send('Analyzed text and saved analysis to database');
        } else {
          res.send('It has not yet been more than 12 hours since we last analyzed your data! Please wait a little bit longer')
        }
      })

  }

  var saveTextAnalysis = (req, res, datetime, dictionary) => {
    var userId = req.user.id /* Amazon */ || req.user.dataValues.id /* Facebook */;

    var buffer = Buffer.from(JSON.stringify(dictionary));
    // var arrayBuffer = Uint8Array.from(buffer).buffer;

    config.Analysis.findOrCreate({
        where: {
          datetime: datetime,
          userId: userId
        }, 
        defaults: {
          analysis: buffer,
          datetime: datetime,
          userId: userId
        }
      })
      .spread((instance, created) => {
        if (!created) {
          instance.update({
              analysis: buffer
            })
            .then(() => {
              console.log('Updated analysis in database!');
            })
            .catch(error => {
              console.log(error);
            })
        } else {
          console.log('Created and saved analysis to database!');
        }
      })
  }

  var retrieveTextAnalysis = (req, res) => {
    var userId = req.user.id /* Amazon */ || req.user.dataValues.id /* Facebook */;

    config.Analysis.find({
        where: {
          userId: userId,
          datetime: req.query.date
        }
      })
      .then(analysis => {
        if (analysis) {
          res.json({
            date: req.query.date,
            dictionary: analysis.dataValues.analysis.toString(),
          });
        } else {
          res.send('Could not find a dictionary for this date');
        }
      });
  }

  var retrieveAllTextAnalyses = (req, res) => {
    var userId = req.user.id /* Amazon */ || req.user.dataValues.id /* Facebook */;

    config.Analysis.findAll({
        where: {
          userId: userId
        }
      })
      .then(analyses => {
        // console.log(analyses);
        var responseObject = {}; // general object with date-keys and dictionaries
        var responseArray = [
          {
            name: 'Things',
            children: []
          },
          {
            name: 'Feelings',
            children: []
          }
        ]; // for treemap, etc.
        analyses.forEach(analysis => {
          var data = analysis.dataValues;
          var date = data.datetime;
          var dictionary = analysis.dataValues.analysis.toString();
          // console.log('===>', req.query);
          // console.log(date);
          // console.log(JSON.parse(dictionary));

          if (req.query.aggregate) { // process dictionaries into workable cumulative array
            var types = JSON.parse(dictionary)['#TYPES#'];
            if (types && types['NOUN']) {
              var nouns = types['NOUN'];
              Object.keys(nouns).forEach(noun => {
                var increment = nouns[noun].count;
                // check if noun already in array
                var found = false;
                responseArray[0].children.forEach(child => {
                  if (child.name.toLowerCase() === noun.toLowerCase()) {
                    child.size += increment;
                    found = true;
                  }
                })
                // else instantiate with size in dictionary
                if (!found) {
                  responseArray[0].children.push({
                    name: noun,
                    size: increment
                  })
                }
              })
            }
            if (types && types['ADJ']) {
              var adjectives = types['ADJ'];
              Object.keys(adjectives).forEach(adjective => {
                var increment = adjectives[adjective].count;
                // check if adjective already in array
                var found = false;
                responseArray[1].children.forEach(child => {
                  if (child.name.toLowerCase() === adjective.toLowerCase()) {
                    child.size += increment;
                    found = true;
                  }
                })
                // else instantiate with size in dictionary
                if (!found) {
                  responseArray[1].children.push({
                    name: adjective,
                    size: increment
                  })
                }
              })
            }
          } else {
            // just send back dictionaries without processing
            responseObject[date] = dictionary;
          }
        });
        if (req.query.aggregate) {
          res.json(responseArray); // return array formatted for use in treemap and other charts
        } else {
          res.json(responseObject); // return object organized by date-keys with dictionaries
        }
      });
  }

  return {
    analyzeDays: analyzeDays,
    saveTextAnalysis: saveTextAnalysis,
    retrieveTextAnalysis: retrieveTextAnalysis,
    retrieveAllTextAnalyses: retrieveAllTextAnalyses
  }
})();