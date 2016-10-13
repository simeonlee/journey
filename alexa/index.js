'use strict';

var request = require('request');

// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
  return {
    outputSpeech: {
      type: 'PlainText',
      text: output,
    },
    card: {
      type: 'Simple',
      title: `SessionSpeechlet - ${title}`,
      content: `SessionSpeechlet - ${output}`,
    },
    reprompt: {
      outputSpeech: {
        type: 'PlainText',
        text: repromptText,
      },
    },
    shouldEndSession,
  };
}

function buildResponse(sessionAttributes, speechletResponse) {
  return {
    version: '1.0',
    sessionAttributes: sessionAttributes,
    response: speechletResponse,
  };
}

// --------------- Functions that control the skill's behavior -----------------------

function journal (intent, session, callback) {
  console.log('session', session);
  console.log('intent', intent);
  console.log('callback', callback);
  const cardTitle = 'Journey';
  let repromptText = 'Would you mind repeating that? I didn\'t quite catch what you said.';
  if (!session.attributes) {
    session.attributes = {};
  }
  var sessionAttributes = session.attributes;
  var speechOutput;
  
  let shouldEndSession = false;
  var userId = session.user.userId.slice(-207);

  if (!sessionAttributes.type) {
    if (intent.name === 'MorningIntent') {
      sessionAttributes = {type: 'morning', step: 1};
      speechOutput = 'Let\'s record three things you\'re grateful for. What\'s the first thing?';
    } else if (intent.name === 'EveningIntent') {
      sessionAttributes = {type: 'evening', step: 1};
      speechOutput = 'Let\'s record three amazing things that happened today. What\'s the first?';
    } else {
      speechOutput = 'Please say take my morning entry or take my evening entry.';
      sessionAttributes.reprompt = true;
    }
    console.log(sessionAttributes);
    callback(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
  } else {
    if (intent.name !== 'JournalIntent') {
      console.log('intent mismatch');
      callback(sessionAttributes, buildSpeechletResponse(cardTitle, repromptText, repromptText, shouldEndSession));
    } else {
      
    
      console.log('USER SAID ' + intent.slots.entry.value);
      if (sessionAttributes.type === 'morning') {
        if (sessionAttributes.step === 1) {
          speechOutput = 'Great! And the second?';
        }
        if (sessionAttributes.step === 2) {
          speechOutput = 'Awesome. I just need one more thing you\'re grateful for.';
        }
        if (sessionAttributes.step === 3) {
          speechOutput = 'Thanks! Now we need three things that would make today a great day. What\'s the first?';
        }
        if (sessionAttributes.step === 4) {
          speechOutput = 'Great! And the second?';
        }
        if (sessionAttributes.step === 5) {
          speechOutput = 'Perfect. Now one more thing that would make today great.';
        }
        if (sessionAttributes.step === 6) {
          speechOutput = 'Now for some daily affirmations. Say a few nice things about yourself';
        }
        if (sessionAttributes.step === 7) {
          speechOutput = 'Your morning entry is complete. Have an amazing day!';
          shouldEndSession = true;
        }
      }
      if (sessionAttributes.type === 'evening') {
        // we went all day without a merge conflict
        if (sessionAttributes.step === 1) {
          speechOutput = 'Great! And the second?';
          // we actually rehearsed this presentation
        }
        if (sessionAttributes.step === 2) {
          speechOutput = 'Perfect. Now one more amazing thing that happened today.';
          // i got to work with you, alexa
        }
        if (sessionAttributes.step === 3) {
          speechOutput = 'Amazing. How could you have made today better?';
          // i could've taken a 3 hour lunch
        }
        if (sessionAttributes.step === 4) {
          speechOutput = 'Your evening entry is complete. Goodnight!';
          shouldEndSession = true;
        }
      
      }
      
      if ((sessionAttributes.type === 'morning' && (sessionAttributes.step === 1 || sessionAttributes.step === 4 || sessionAttributes.step === 7)) || (sessionAttributes.type === 'evening' && (sessionAttributes.step === 1 || sessionAttributes.step === 4))) {
        sessionAttributes.text = intent.slots.entry.value
      } else {
        sessionAttributes.text += ',' + intent.slots.entry.value;
      }
      
      if ((sessionAttributes.type === 'morning' && (sessionAttributes.step === 3 || sessionAttributes.step === 6 || sessionAttributes.step === 7)) || (sessionAttributes.type === 'evening' && (sessionAttributes.step === 3 || sessionAttributes.step === 4))) {
        
        var payload = {
          userId: session.user.userId,
          entryType: sessionAttributes.type,
          prompt: sessionAttributes.step,
          text: sessionAttributes.text
        };
        
        sessionAttributes.step++;
        
        console.log('about to post, payload is: ', payload);
        request({
          url: 'http://10.0.0.109:1337/alexaPost', //URL to hit
          method: 'POST',
          //Lets post the following key/values as form
          json: payload
        }, 
        function (err, res, body) {
          console.log('entry post response',res);
          if (err) {
            console.log('error posting entry', err);
            callback(null, buildResponse({}, buildSpeechletResponse('I\'m sorry, we\'re having connection issues right now. Please try again later.', 'I\'m sorry, we\'re having connection issues right now. Please try again later.', '', true)));
          } else {
            console.log(sessionAttributes);
            callback(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)); 
          }
        });
      } else {
        sessionAttributes.step++;
        callback(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)); 
      }
      
    }
  }

}


function getWelcomeResponse(callback) {
  var sessionAttributes = {};
  const cardTitle = 'Welcome';
  const speechOutput = 'Welcome to Journey! ' +
    'You can say take my morning entry or take my evening entry.';
  const repromptText = 'Please say take my morning entry or take my evening entry. ' +
    'What type of entry would you like to make?';
  const shouldEndSession = false;

  callback(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleSessionEndRequest(callback) {
  const cardTitle = 'Session Ended';
  const speechOutput = 'Thank you for using Journey. Have an amazing day!';
  const shouldEndSession = true;
  callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}


// --------------- Events -----------------------

function onSessionStarted(sessionStartedRequest, session) {
  console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}

function onLaunch(launchRequest, session, callback) {
  console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);
  getWelcomeResponse(callback);
}

function onIntent(intentRequest, session, callback) {
  console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);
  const intent = intentRequest.intent;
  const intentName = intentRequest.intent.name;

  if (intentName === 'MorningIntent') {
    journal(intent, session, callback);
  } else if (intentName === 'EveningIntent') {
    journal(intent, session, callback);
  } else if (intentName === 'JournalIntent') {
    journal(intent, session, callback);
  } else if (intentName === 'AMAZON.HelpIntent') {
    getWelcomeResponse(callback);
  } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
    handleSessionEndRequest(callback);
  } else {
    throw new Error('Invalid intent');
  }
}

function onSessionEnded(sessionEndedRequest, session) {
  console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
}

// --------------- Main handler -----------------------

exports.handler = (event, context, callback) => {
  console.log(`event is=${JSON.stringify(event)}`);

  try {
    console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);
    
    if (event.session.application.applicationId !== 'amzn1.ask.skill.67b11402-911f-4efa-bf28-76832fcca712') {
       callback('Invalid Application ID');
    }
    if (event.session.new) {
      onSessionStarted({ requestId: event.request.requestId }, event.session);
      if (event.session.user.accessToken) {
        request({
          url: 'http://10.0.0.109:1337/token', //URL to hit
          method: 'POST',
          //Lets post the following key/values as form
          json: event.session.user
        },
        function (err, res, body) {
          console.log('token post response', res);
          if (err) {
            console.log('error sending token', err);
            callback(null, buildResponse({}, buildSpeechletResponse('I\'m sorry, we\'re having connection issues right now. Please try again later.', 'I\'m sorry, we\'re having connection issues right now. Please try again later.', '', true)));
          }
            if (event.request.type === 'LaunchRequest') {
              onLaunch(event.request, event.session, (sessionAttributes, speechletResponse) => { callback(null, buildResponse(sessionAttributes, speechletResponse)) });
            } else if (event.request.type === 'IntentRequest') {
              onIntent(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                  callback(null, buildResponse(sessionAttributes, speechletResponse));
              });
            } else if (event.request.type === 'SessionEndedRequest') {
              onSessionEnded(event.request, event.session);
              callback();
            }
          }
        );
      } else {
        callback(null, buildResponse({}, buildSpeechletResponse('Please connect Journey to your amazon account in the Alexa web portal.', 'Please connect Journey to your amazon account in the Alexa web portal.', '', true)));
      }
      
    } else if (event.request.type === 'LaunchRequest') {
      onLaunch(event.request,
        event.session,
        (sessionAttributes, speechletResponse) => {
          callback(null, buildResponse(sessionAttributes, speechletResponse));
        });
    } else if (event.request.type === 'IntentRequest') {
      onIntent(event.request,
        event.session,
        (sessionAttributes, speechletResponse) => {
          callback(null, buildResponse(sessionAttributes, speechletResponse));
        });
    } else if (event.request.type === 'SessionEndedRequest') {
      onSessionEnded(event.request, event.session);
      callback();
    }
  } catch (err) {
    callback(err);
  }
};