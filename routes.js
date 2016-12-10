'use strict'

var Auth = require('./controllers/auth'),
    API = require('./controllers/api.js');

module.exports = function(app) {

    app.set('view engine', 'ejs');

    // SITE ROOT
    app.get('/', (req, res) => { // replace this route with a landing or home page, or break this out into another controller if needed!
        //blup(req,res,next);
        res.render('home');
    });
    app.get('/login', Auth.render); // route for the login page
    app.get('/', Auth.logout); // route for logging out

    app.post('/login', Auth.login); // form request endpoint for loggin in
    app.post('/register', Auth.register); // form request endpoint for user registration

    // DAHSBOARD
    app.all('/dashboard*', Auth.session); // protect all dashboard routes from unauthorized users
    app.get('/dashboard', (req, res) => { // renders the dashboard, break this out into another controller if needed!
    	res.render('dashboard', req.session);
    });

    // USER INFORMATION ONCE LOGGED IN
    app.get('/whoami', Auth.whoami);

    // BEACON ROUTES
    app.get('/purple', (req, res) => {
      console.log('This is purple');
      res.redirect('https://www.bitcoin.com/choose-your-wallet/unlimited')
      // res.render('purple')
    });
    app.get('/green', (req, res) => {
      console.log('This is green');
      res.redirect('https://www.youtube.com/embed/BKb3_mu5JBM')
      // res.render('green')
    });
    app.get('/blue', (req, res) => {
      console.log('This is blue');
      res.redirect('https://www.youtube.com/embed/dfWfXC5O-d8')
      // res.render('blue')
    });

    // API ROUTES
    app.get('/api/client/object', API.object);
    app.get('/api/client/exhibit', API.exhibit);
    app.get('/api/client/devices', API.devices);

    // WATSON TEXT TO SPEECH ROUTES
    app.get('/api/speak', API.speech);

    // // WATSON VOICE ROUTES
    // // Return the list of voices
    // app.get('/api/voices', API.voices);

};
