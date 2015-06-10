var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*var Routes = new Schema({
        sourcelng: Number,
        sourcelt: Number,
        destinationlng: Number,
        destinationlt: Number,
});*/
var Routes = new Schema({
    srcloc: {
        type: { type: String }
        , coordinates: []
    },
    dstloc: {
        type: { type: String }
        , coordinates: []
    }
});
//Routes.index({ srcloc: '2dsphere' });

module.exports = mongoose.model('Routes', Routes);