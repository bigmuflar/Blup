var dotenv  = require('dotenv').config(),
    request = require('request'),
    express = require('express'),
    bodyParser = require('body-parser'),
    url = require('url'),
    watson = require('watson-developer-cloud'),
    app = express(), // initialize express
    exec = require('child_process').exec;


    module.exports = {
        object: (req, res) => {
          var options = {
            url: 'https://www.brooklynmuseum.org/api/v2/object/',
            headers: {
              'api_key': process.env.API_KEY
            }
          };
          console.log(options);
          function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
              // console.log(response.data);
              // console.log("response",response);
              res.send(body);
            }else{
              res.send('error api', error);
            }
          }
        request(options, callback);
        },
        exhibit: (req, res) => {
            var options = {
              url: 'https://www.brooklynmuseum.org/api/v2/exhibition/',
              headers: {
                'api_key': process.env.API_KEY
              }
            };
            function callback(error, response, body) {
              if (!error && response.statusCode == 200) {
                // console.log(response.data);
                // console.log("response",response);
                res.send(body);
              }else{
                console.log('error on exhibit api');
                res.send('error api', error);
              }
            }
          request(options, callback);
        },
        devices: (req, res) => {
               exec("curl 'https://cloud.estimote.com/v1/beacons' -X GET -u blup-estimote-app-itz:21d53a7dc431ed68ee49dc437b2f0a83 -H 'Accept: application/json'", (error, stdout, stderr) => {
                  if (error) {
                    console.error(`exec error: ${error}`);
                    console.log('woops on devices!');
                    res.send(error);
                  }else{
                  res.send(stdout);
                  console.log(`stderr: ${stderr}`);
                }
              });
        },
        speech: (req, res) => {
           var query = url.parse(req.url, true).query;
           var text_to_speech = watson.text_to_speech({
             username: process.env.TEXT_TO_SPEECH_USERNAME,
             password: process.env.TEXT_TO_SPEECH_PASSWORD,
             version: 'v1',
             url: 'https://stream.watsonplatform.net/text-to-speech/api'
           });

           var params = {
             text: query.text,
             voice: 'en-US_AllisonVoice', // Optional voice
             accept: 'audio/wav'
           };
           text_to_speech.synthesize(params).pipe(res);
           console.log('hitting speech API');
        }
      //   (req, res, next) => {
      //    textToSpeech.voices(null, (error, voices) => {
      //      if (error) {
      //        return next(error);
      //      }
      //      res.json(voices);
      //    });
      //  });

}
