var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Routes = new Schema({
    source: String,
    destination: String
});

module.exports = mongoose.model('Routes', Routes);