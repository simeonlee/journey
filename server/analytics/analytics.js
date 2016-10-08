/**
 * Journal entry language data crunched via Google Cloud NLP (beta)
 * https://github.com/GoogleCloudPlatform/google-cloud-node
 */

var auth = require('../../auth').google;
var language = require('@google-cloud/language')({
  projectId: auth.project_id,
  credentials: auth
});
var USE_API = false; // set to true or false to control API usage (since it eventually requires money!)

var analyze = (text) => {

  // Create document to run multiple detections
  var document = language.document(text);

  // Find nouns
  document.detectEntities((err, entities) => {
    err && console.log(err);
    console.log(entities);
  });

  // Analyze sentiment, e.g., 'sentiment = 100' (large number = more positive)
  document.detectSentiment((err, sentiment) => {
    err && console.log(err);
    console.log(sentiment);
  });

  // Parse syntax for 'tokens' (nouns, verbs, etc.) (also returns sentiment and entities)
  document.annotate((err, annotations) => {
    err && console.log(err);
    console.log(annotations);
  });

}

// Call empty function from 'server.js' if we don't want to
// use up limited API calls by setting 'USE_API' to false
module.exports = USE_API ? analyze : () => {};