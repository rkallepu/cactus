var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    //req.session.destroy();
    req.logout();
    res.render('logout',{});
    /*req.session.destroy(function (err) {
        console.log(err);
        res.redirect('/logout'); //Inside a callback… bulletproof!
    });*/
    //res.redirect('/logout');
});
module.exports = router;

