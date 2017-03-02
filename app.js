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

app.get('/test', function(req, res){
  console.log("yello");
  res.send("test page");
})

function tOut(millis){
  setTimeout(function () {
    console.log('boo')
  }, 100)
  var end = Date.now() + millis;
  while (Date.now() < end) ;
}

// [START YourAction]
app.post('/', function (req, res) {
  const assistant = new Assistant({request: req, response: res});
  console.log('Request headers: ' + JSON.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));

  // Fulfill action business logic
  function responseHandler (assistant) {
    // Complete your fulfillment logic and send a response
    let text_to_speech = '<speak>'
   + 'Here are <say-as interpret-as="characters">SSML</say-as> samples. '
   + 'I can pause <break time="3"/>. '
   + 'I can speak in cardinals. Your position is <say-as interpret-as="cardinal">10</say-as> in line. '
   + 'Or I can speak in ordinals. You are <say-as interpret-as="ordinal">10</say-as> in line. '
   + 'Or I can even speak in digits. Your position in line is <say-as interpret-as="digits">10</say-as>. '
   + 'I can also substitute phrases, like the <sub alias="World Wide Web Consortium">W3C</sub>. '
   + 'Finally, I can speak a paragraph with two sentences. '
   + '<p><s>This is sentence one.</s><s>This is sentence two.</s></p>'
   + '</speak>'
    assistant.tell(text_to_speech);
  }

  assistant.handleRequest(responseHandler);
});
// [END YourAction]

if (module === require.main) {
  // [START server]
  // Start the server
  let server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port;
    console.log('App listening on port %s', port);
    console.log("yo");
  });
  // [END server]
}

module.exports = app;
