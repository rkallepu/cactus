var passport = require('passport'),
    Account = require('./accounts'),
    express = require('express'),
    session = require('cookie-session'),
    router = express.Router();
module.exports = function (app){
    /*app.use(session({ keys: ['secretkey']}));*/
    app.use(session({ keys: ['secretkey']}));

    app.use(passport.initialize());
    app.use(passport.session());

    var Account = require('./accounts');
    passport.use(Account.createStrategy());
    passport.serializeUser(Account.serializeUser());
    passport.deserializeUser(Account.deserializeUser());

    app.use('/', require('./router'));
};