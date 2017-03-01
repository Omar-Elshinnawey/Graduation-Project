var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    role: Number,
    email: String,
    password: String,
    name: String,
    nationalId: String,
    address: String,
    phone: String
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);

module.exports = User;