'use strict'

var Auth = require('./controllers/auth');
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
    	res.render('dashboard', req.session)
    });
//    app.get('/', (req, res, next) => {
//	console.log('portfolio');
//     	res.send('There was an issue rendering the portfolio site....');
//    });
}
