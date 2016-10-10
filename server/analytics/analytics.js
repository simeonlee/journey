/**
 * Journal entry language data crunched via Google Cloud NLP (beta)
 * https://github.com/GoogleCloudPlatform/google-cloud-node
 */

var auth = require('../../auth').google;
var language = require('@google-cloud/language')({
  projectId: auth.project_id,
  credentials: auth
});
var USE_API = true; // Set to true or false to control API usage (since it costs money after 5k+ calls per month)
var dictionary = {};

var analyze = (req, res, data) => {

  // Collect all cumulative text of journal for science
  var cumulative = ' ';

  // Iterate over all sections of journal in the data object
  var types = Object.keys(data); // ['gratitudes', 'outlooks', 'affirmations', 'amazings', 'reflections']
  var sections = types.map(type => {

    // Iterate over all entries of the section in the journal
    var section = ' ';
    data[type].forEach(entry => {

      // Grab all three entries for that particular day
      var entry = entry.entry;
      entry = entry.replace(/,/g, ' ');

      // Add the day's text to the cumulative section paragraph
      section = section + ' ' + entry;

      // Add the day's text to the cumulative journal paragraph
      cumulative = cumulative + ' ' + entry;
    })

    // Clean up beginning and multiple spaces
    section = section.replace(/  +/g, ' ');
    if (section[0] === ' ') { section = section.slice(1); }

    // Add the section text to the array of section texts
    return section;
  });
  // console.log('===> sections:', sections);

  // Clean up beginning and multiple spaces
  cumulative = cumulative.replace(/  +/g, ' ');
  if (cumulative[0] === ' ') { cumulative = cumulative.slice(1); }
  // console.log('===> cumulative:', cumulative);

  cumArr = cumulative.split(' ');
  // console.log('===> cumulative:', cumArr);
  cumArr.forEach(word => {
    dictionary[word] = dictionary[word] || {};
    dictionary[word]['count'] = dictionary[word]['count'] || 0;
    dictionary[word]['count']++;
  });

  // USE_API && analyze(cumulative);

  // Create document to run multiple detections
  var document = language.document(cumulative);

  // Find nouns
  // document.detectEntities((err, entities) => {
  //   err && console.log(err);
  //   console.log(entities);
  // });

  // Analyze sentiment, e.g., 'sentiment = 100' (large number = more positive)
  // document.detectSentiment((err, sentiment) => {
  //   err && console.log(err);
  //   console.log(sentiment);
  // });

  // Parse syntax for 'tokens' (nouns, verbs, etc.) (also returns sentiment and entities)
  USE_API && document.annotate((err, annotations) => {
    err && console.log(err);
    var tokens = annotations.tokens;
    // console.log(tokens);

    for (var word in dictionary) {
      // console.log('word', word);
      annotations.tokens.forEach(token => {
        if (word === token.text) {
          // console.log('text', token.text);
          Object.assign(dictionary[word], token);
        }
      });
    }

    dictionary['#TYPES#'] = {};

    for (var word in dictionary) {
      if (dictionary[word].partOfSpeechTag) {
        var POST = dictionary[word].partOfSpeechTag;
        // console.log('===> POST', POST)
        dictionary['#TYPES#'][POST] = dictionary['#TYPES#'][POST] || {};
        dictionary['#TYPES#'][POST][word] = dictionary[word];
      }
    }

    // console.log(dictionary);
    require('../db/controllers/analytics').saveAnalyzedTextResults(req, res, dictionary);
    // return dictionary;
  });
}

module.exports = analyze;