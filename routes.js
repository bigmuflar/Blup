'use strict'

var Auth = require('./controllers/auth'),
    API = require('./controllers/api.js'),
    router = express.Router();

module.exports = function(app) {

    app.set('view engine', 'ejs');

    // SITE ROOT
    app.get('/', (req, res) => { // replace this route with a landing or home page, or break this out into another controller if needed!
        //blup(req,res,next);
        res.render('home');
    });
    app.get('/login', Auth.render); // route for the login page
    app.get('/logout', Auth.logout); // route for logging out

    app.post('/login', Auth.login); // form request emdpoint for loggin in
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
      res.render('purple')
    });
    app.get('/green', (req, res) => {
      console.log('This is green');
      res.render('green')
    });
    app.get('/blue', (req, res) => {
      console.log('This is blue');
      res.render('blue')
    });

    // API ROUTES
    app.get('/api/client/object', API.object);
    app.get('/api/client/exhibit', API.exhibit);
    app.get('/api/client/devices', API.devices);

    // WATSON TEXT TO SPEECH ROUTES
    app.get('/api/speak', API.speech);

    // // a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
    // router.use('/api/client/object/:id', function (req, res, next) {
    //   console.log('Request URL:', req.originalUrl)
    //   next()
    // }, function (req, res, next) {
    //   console.log('Request Type:', req.method)
    //   next()
    // })
    //
    // // a middleware sub-stack that handles GET requests to the /user/:id path
    // router.get('/api/client/object/:id', function (req, res, next) {
    //   // if the user ID is 0, skip to the next router
    //   if (req.params.id === '0') next('route')
    //   // otherwise pass control to the next middleware function in this stack
    //   else next()
    // }, function (req, res, next) {
    //   // render a regular page
    //   res.render('regular')
    // })
    //
    // // handler for the /user/:id path, which renders a special page
    // router.get('/api/client/object/:id', function (req, res, next) {
    //   console.log(req.params.id)
    //   res.render('special')
    // })

    // // WATSON VOICE ROUTES
    // // Return the list of voices
    // app.get('/api/voices', API.voices);

};
