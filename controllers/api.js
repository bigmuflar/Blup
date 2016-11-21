var endpoint = 'https://www.brooklynmuseum.org/api/v2',
    dotenv  = require('dotenv').config(),
    request = require('request'),
    express = require('express'),
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
            function exec("curl 'https://cloud.estimote.com/v1/beacons' -X GET -u blup-estimote-app-itz:21d53a7dc431ed68ee49dc437b2f0a83 -H 'Accept: application/json'", (error, stdout, stderr) => {
              if (error) {
                console.error(`exec error: ${error}`);
                return;
              }
              console.log('error on devices api');
              bodyParser.json(res.stdout);
              console.log(`stdout: ${stdout}`);
              console.log(`stderr: ${stderr}`);
            })
          }
          request(exec);
      }
}
