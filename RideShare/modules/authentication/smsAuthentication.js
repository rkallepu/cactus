var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SmsAuth = new Schema({
    uuid: String,
    phone: Number,
    authCode: Number,
    isRegistered: Boolean
});


module.exports = mongoose.model('SmsAuth', SmsAuth);