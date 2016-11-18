var endpoint = 'https://www.brooklynmuseum.org/api/v2',
    dotenv  = require('dotenv').config(),
    request = require('request');

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
        }
    }
