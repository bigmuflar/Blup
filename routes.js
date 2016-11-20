'use strict'

var Auth = require('./controllers/auth'),
    API = require('./controllers/api.js');
    app.engine('html', require('ejs').renderFile);
//var express = require('express');

module.exports = function(app) {
//    var blup = function(req,res,next){
//      if(req.subdomains[0]!="blup"){
//        console.log('hitting sub');
//	next();
//     }else{
//      	console.log('not hitting sub');
//	}
//    };

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

    //USER INFORMATION ONCE LOGGED IN
    app.get('/whoami', Auth.whoami);

    //Beacon routes
    app.get('/purple', (req, res) => {
      console.log('This is purple');
      res.render('views/purple')
    });
    app.get('/green', (req, res) => {
      console.log('This is green');
      res.render('views/green')
    });
    app.get('/blue', (req, res) => {
      console.log('This is blue');
      res.render('views/blue')
    });

    //API routes
    app.get('/api/client/object', API.object);
    app.get('/api/client/exhibit', API.exhibit);
//    app.get('/', (req, res, next) => {
//	console.log('portfolio');
//     	res.send('There was an issue rendering the portfolio site....');
//    });
}
