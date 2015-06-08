var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('login', { user: req.user });
});

// localhost:3000/login
router.post('/', passport.authenticate('local'), function(req, res) {
    //console.log('hit request');
    if(req.user){
        console.log('User Logged In');
        res.status(200).json({user: {
            name: req.user.username,
            id: req.user._id
        }});
    }
});
module.exports = router;


