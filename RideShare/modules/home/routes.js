var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Routes = new Schema({
    type: {
        sourcelng: Number,
        sourcelt: Number,
        destinationlng: Number,
        destinationlt: Number
    },
    loc: {type: [Number], index: '2dsphere' }
});

Routes.index({type: 1, loc: 1});

module.exports = mongoose.model('Routes', Routes);