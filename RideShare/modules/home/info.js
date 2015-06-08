var express = require('express');
var router = express.Router();
var Routermodel = require('./routes');

router.get('/', function(req, res) {
    res.render('info', {user: req.user});
});
router.post('/', function (req, res){
    (new Routermodel(req.body)).save(function (err, result){
        if(err) res.status(500).json(err);
        else res.status(200).json({message: 'Added'});
    });
});
module.exports = router;
