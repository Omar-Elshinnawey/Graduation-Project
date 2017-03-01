var passportLocal = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var expressSession = require('express-session');

var User = require('../models/user.model');
var ROLE = require('../models/role.model');
var ERRORS = require('../models/error.model');

module.exports = class AuthController {

    constructor(passport) {
        this.passport = passport;
     }

    setup(app) {

        app.use(expressSession({
            secret: "abdo took a taxi to the downtown and ate a turkey",
            resave: false,
            saveUninitialized: false
        }));

        app.use(this.passport.initialize());
        app.use(this.passport.session());
        this.passport.use(new passportLocal(User.authenticate()));

        this.passport.serializeUser(User.serializeUser());
        this.passport.deserializeUser(User.deserializeUser());
    }

    signup(username, password, role, email, name, nationalId, address, phone, callback) {

        if (!this.validateEmptyOrWhiteSpace(username)) {

            callback(ERRORS.AUTH.USERNAME_MISSING, 'error');
            return;

        }

        if (!this.validateEmptyOrWhiteSpace(password)) {

            callback(ERRORS.AUTH.PASSWORD_MISSING, 'error');
            return;

        }

        if (!this.validateEmptyOrWhiteSpace(email)) {

            callback(ERRORS.AUTH.EMAIL_MISSING, 'error');
            return;

        }

        if (!this.validateEmptyOrWhiteSpace(name)) {

            callback(ERRORS.AUTH.NAME_MISSING, 'error');
            return;

        }

        if (!this.validateEmptyOrWhiteSpace(address)) {

            callback(ERRORS.AUTH.ADDRESS_MISSING, 'error');
            return;

        }

        if (!this.validateEmptyOrWhiteSpace(phone)) {

            callback(ERRORS.AUTH.PHONE_MISSING, 'error');
            return;
            
        }

        if((!role && role !== 0 ) || (role !== ROLE.ADMIN && role !== ROLE.CUSTOMER && role !== ROLE.PROVIDER)){
            console.log(role);
            callback(ERRORS.AUTH.INVALID_ROLE, 'error');
            return;

        }

        if(role === ROLE.PROVIDER && !this.validateEmptyOrWhiteSpace(nationalId)){

            callback(ERRORS.AUTH.NATIONALID_MISSING, 'error');
            return;

        }

        var user = new User({
            username: username,
            role: role,
            email: email,
            name: name,
            address: address,
            phone: phone
        });

        if(role === ROLE.PROVIDER)
            user.nationalId = nationalId;
        
        User.register(user, new Buffer(password), function(err, account){

            if(err) 
                callback(err, false);
            else
                callback(null, true);

        });

    }

    validateEmptyOrWhiteSpace(args) {

        if (!args || !/\S/.test(args))
            return false;
        else
            return true;
    }
}