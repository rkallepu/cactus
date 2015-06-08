var passport = require('passport'),
    Account = require('./accounts'),
    express = require('express'),
    router = express.Router();
module.exports = function (app){

    app.use(passport.initialize());
    app.use(passport.session());

    var Account = require('./accounts');
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
    passport.use(Account.createStrategy());

    passport.serializeUser(Account.serializeUser());
    passport.deserializeUser(Account.deserializeUser());

    /*app.use('/login', require('./login'));
    app.use('/register', require('./register'));
    app.use('/logout', require('./logout'));
    app.use('/info', require('./../homePage/info'));*/

    app.use('/', require('./router'));
};