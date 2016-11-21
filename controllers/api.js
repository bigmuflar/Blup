var endpoint = 'https://www.brooklynmuseum.org/api/v2',
    dotenv  = require('dotenv').config(),
    request = require('request'),
    headers = {'Accept': 'application/json'};

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
              console.log('error on api');
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
                console.log('error on api');
                res.send('error api', error);
              }
            }
          request(options, callback);
        },
        devices: (req, res) => {
          var options = {
              url: 'https://cloud.estimote.com/v2/devices',
              headers: headers,
              auth: {
                  'user': process.env.YOUR_SDK_APP_ID,
                  'pass': process.env.YOUR_SDK_APP_TOKEN
              }
          };

          function callback(error, response, body) {
              if (!error && response.statusCode == 200) {
                  console.log(body);
                  res.send('error api', error);
              }
          }

          request(options, callback);
        }
    }
