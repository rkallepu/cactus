var express = require('express');
var router = express.Router();
var Routermodel = require('./routes');

router.get('/info', function(req, res) {
    res.render('info', {user: req.user});
});
router.get('/getRoutes', function(req, res) {
    Routermodel.find({},function(err, results){
        if(err) res.status(500).json(err);
        else res.status(200).json(results);
    });
});
router.get('/searchRoutes', function(req, res) {
    Routermodel.find({
        srcloc:{
            $near:{
                $geometry:
                {
                    type: 'Point',
                    coordinates: [Number(req.query.lng), Number(req.query.lat)]
                },
                $maxDistance: 5000,
                $minDistance: 0
            }
        }
    },function(err, results){
        if(err) res.status(500).json(err);
        else res.status(200).json(results);
    });
});
router.post('/info', function (req, res){
    console.log(req.body);
    (new Routermodel(req.body)).save(function (err, result){
        if(err) res.status(500).json(err);
        else res.status(200).json({message: 'Added'});
    });
});
module.exports = router;