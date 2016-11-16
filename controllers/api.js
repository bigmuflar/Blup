var endpoint = 'https://www.brooklynmuseum.org/api/v2',
    request = require('request');

    module.exports = {
        // decade: (req, res) => {
        //     // ES6 template literal way to do string concatenation
        //     request(`${endpoint}/exhibition?limit=10&decade=${req.query.decade}`, (err, response, body) =>{
        //         //console.log("Body: ", body);
        //         res.send({
        //             error: err,
        //             response: response,
        //             body: arr,
        //         });
        //     });
        // },
        exhibit: (req, res) => {
            request(`${endpoint}/exhibition/`, (err, response, body) => {
                res.send({
                    error: err,
                    response: response,
                    body: body,
                });
            })
        }
    }
