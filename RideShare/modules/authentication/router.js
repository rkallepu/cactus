var mongoose = require('mongoose'),
    passport = require('passport'),
    Account = require('./accounts'),
    express = require('express'),
    router = express.Router();

router.get('/login', function(req, res) {
    res.render('login', { user: req.user });
});
router.post('/login', passport.authenticate('local'), function(req, res) {
    //console.log('hit request');
    if(req.user){
        //console.log('User Logged In');
        res.status(200).json({user: {
            name: req.user.username,
            id: req.user._id
        }});
    }
});
router.get('/register', function(req, res) {
    res.render('register', {});
});

router.post('/register', function(req, res, next) {
    //console.log('registering user');
    //console.log(req.body);
    Account.register(new Account({ username: req.body.username }), req.body.password, function(err) {
        if (err) {
            console.log('error while user register!', err); return next(err);
        }
        else {
            console.log('user registered!');
            res.status(200).json({message: "User registered successfully"});
        }
    });
});
router.get('/logout', function(req, res) {
    //req.session.destroy();
    /*req.logout();
    res.render('logout',{});*/
    /*req.session.destroy(function (err) {
     console.log(err);
     res.redirect('/logout'); //Inside a callback… bulletproof!
     });*/
    //res.redirect('/logout');
    req.logout();
    console.log('logged out...');
    res.redirect('/login');
});
module.exports = router;

