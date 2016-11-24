var dotenv  = require('dotenv').config(),
    request = require('request'),
    express = require('express'),
    bodyParser = require('body-parser'),
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
              console.log('error on object api');
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
            console.log(options);
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
        translateText: function (input, target, callback) => {
          // Instantiates a client
          const translate = Translate({
            // The Translate API uses an API key for authentication. This sample looks
            // for the key in an environment variable.
            key: process.env.TRANSLATE_API_KEY
          });

          // Translates the text into the target language. "input" can be a string for
          // translating a single piece of text, or an array of strings for translating
          // multiple texts.
          translate.translate(input, target, (err, translation) => {
            if (err) {
              callback(err);
              return;
            }
            console.log('Text: %j', input);
            console.log('Translation: %j', translation);
            callback();
          });
        }

}
