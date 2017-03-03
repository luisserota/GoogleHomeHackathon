// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

process.env.DEBUG = 'actions-on-google:*';
let Assistant = require('actions-on-google').ApiAiAssistant;
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json({type: 'application/json'}));

function tOut(millis){
  setTimeout(function () {
    console.log('boo')
  }, 100)
  var end = Date.now() + millis;
  while (Date.now() < end) ;
}

function confirm_area_to_work_on(req, assistant) {
  let text_to_speech = '<speak>'
 + 'ok! Great. so now we\'re going to work on first learning how to make an "l" sound with your mouth. {instructions on making an l sound} How did that go for you? If it worked tell me yes.'
 + '</speak>'
 assistant.ask(text_to_speech);
}

function begin_activity(req, assistant) {
    let text_to_speech = '<speak>'
   + 'Awesome you got this. now we\'re going to try some repetition exercises. Say "L" three times. <break time="6"/> how did that go for you?'
   + '</speak>'
   assistant.ask(text_to_speech);
}

function word_activity(req, assistant) {
  let text_to_speech = '<speak>'
  + 'yay now we\'re doing words like "light" "lit" "learn" {add in word activity here} how did that go for you? say yes or no'
  + '</speak>'
  assistant.ask(text_to_speech);
}

function word_repetition(req, assistant) {
  let text_to_speech = '<speak>'
  + 'Say "Lit" five times. <break time="10"/> How did that go for you?'
  + '</speak>'
  assistant.ask(text_to_speech);
}

function phrase_activity(req, assistant) {
  let text_to_speech = '<speak>'
  + 'yay now phrase activity goes here. here\'s a phrase. try saying it.. put pause in here, how did that go for you now?'
  + '</speak>'
  assistant.ask(text_to_speech);
}

function phrase_repetition(req, assistant) {
  let text_to_speech = '<speak>'
  + 'great job! now try that five times. <break time="10"/> How\'d that work for you?'
  + '</speak>'
  assistant.ask(text_to_speech);
}

function problem_area(req, assistant) {
  let text_to_speech = '<speak>'
  + 'ok so let\'s start with some instruction about how to form a sound with your mouth. put your tongue on top of your mouth and form a shape .... {physical instruction} say that 3x- great! how did that work for you?'
  + '</speak>'
  assistant.ask(text_to_speech);
}

// [START YourAction]
app.post('/', function (req, res) {
  const assistant = new Assistant({request: req, response: res});
  // console.log('Request headers: ' + JSON.stringify(req.headers));
  // console.log('Request body: ' + JSON.stringify(req.body));

  // Fulfill action business logic
  function responseHandler (assistant) {
    // Complete your fulfillment logic and send a response
    var intent = req.body.result.metadata.intentName;
    console.log(intent);
    switch (intent) {
      case 'confirm_area_to_work_on':
        confirm_area_to_work_on(req.body, assistant);
        break;
      case 'begin_activity':
        begin_activity(req.body, assistant);
        break;
      case 'word_activity':
        word_activity(req.body, assistant);
        break;
      case 'word_repetition':
        word_repetition(req.body, assistant);
        break;
      case 'phrase_activity':
        phrase_activity(req.body, assistant);
        break;
      case 'phrase_repetition':
        phrase_repetition(req.body, assistant);
        break;
      case 'problem_area':
        confirm_area_to_work_on(req.body, assistant);
        break;
    }
  }
  assistant.handleRequest(responseHandler);
});

if (module === require.main) {
  // [START server]
  // Start the server
  let server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port;
    console.log('App listening on port %s', port);
  });
  // [END server]
}

module.exports = app;
