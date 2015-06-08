var express = require('express');
var passport = require('passport');
var Account = require('./accounts');
var router = express.Router();
/* GET users listing. */

router.get('/', function(req, res) {
    res.render('register', {});
});

router.post('/', function(req, res, next) {
    console.log('registering user');
    console.log(req.body);
    Account.register(new Account({ username: req.body.username }), req.body.password, function(err) {

        if (err) { console.log('error while user register!', err); return next(err); }
        else {
            console.log('user registered!');
            res.status(200).json({message: "User registered successfully"});
        }
    });
});
module.exports = router;