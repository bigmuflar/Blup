require('colors') // awesome colors in your console logs!

var HTTP = require('http'),
    HTTPS = require('https'),
    config = require('./package'),
    express = require('express'), // our framework!
    bodyParser = require('body-parser'), // used for POST routes to obtain the POST payload as a property on `req`
    logger = require('morgan')('dev'), // log the routes being accessed by the frontend
    fileserver = express.static('public'),// turn the public folder into a file server
    fs = require('fs'),
    ports = {
        http:  process.env.PORT || 80,      // default HTTP port
        https: process.env.PORT_SSL || 443  // default HTTPS port
    },
    mongoose = require('mongoose').connect('mongodb://localhost/'.concat(config.name), ( error ) => {
        if( error ) {
            console.error('ERROR starting mongoose!', error);
            process.exit(128);
        } else {
            console.info('Mongoose connected to MongoDB successfully'.yellow);
        }
    }),
    sessions = require('client-sessions')({ // session cookie
        cookieName : config.name, // cookie name (within document.cookies on the Frontend)
        secret: 'My$uP3R@W3$0M3$3CR3+', // encryption secret
        requestKey: 'session', // stores the session cookie in req.session
        duration: (86400 * 1000) * 7, // one week in milliseconds
        cookie: {
            ephemeral: false,   // when true, cookie expires when the browser closes
            httpOnly: true,     // when true, cookie is not accessible from javascript
            secure: false       // when true, cookie will only be sent over SSL;
        }
    }),
    app = express(); // initialize express


//MIDLEWARE
app.all('*', ( req, res, next ) => {
    if( req.protocol === 'http' ) {
        res.set('X-Forwarded-Proto','https');
        res.redirect('https://'+ req.headers.host + req.url);
    } else {
        next();
    }
});

HTTP.createServer(app).listen( ports.http );

try {
    var httpsConfig = { // https://nodejs.org/api/https.html
         key:  fs.readFileSync('/etc/letsencrypt/live/justindegonda.com/privkey.pem'),
         cert: fs.readFileSync('/etc/letsencrypt/live/justindegonda.com/cert.pem')
    };
    HTTPS.createServer( httpsConfig, app ).listen( ports.https );
} catch (e) {
    console.error('Could not HTTPS server:', e);
}

// server setup
app.use(
    logger,    // mounting dev logging
    sessions,  // mounting HTTPs session cookies
    fileserver,// mounting the static middlware
    bodyParser.json(), // mount the body-parsing middleware (parse payloads into req.body)
    bodyParser.urlencoded({ extended:true })
);
//app.use(function(req,res,next){
//  console.log(req.subdomain);
//  next();
//})

// enable server-side rendering
app.set('view engine','ejs');
// do all the routing stuff in a separate file by passing a reference of the app!
require('./routes')(app);
