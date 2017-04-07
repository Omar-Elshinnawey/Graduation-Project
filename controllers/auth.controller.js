const passport = require('passport'),
    passportLocal = require('passport-local'),
    expressSession = require('express-session'),
    RedisStore = require('connect-redis')(expressSession),
    User = require('../models/user.model'),
    offerModel = require('../models/offer.model'),
    ROLE = require('../constants/role.constant'),
    ERRORS = require('../constants/error.constant'),
    Validator = require('../controllers/validator.controller');

function AuthController() {
    this.validator = new Validator();
}

AuthController.prototype.setup = function(app) {

    app.use(expressSession({
        secret: "abdo took a taxi to the downtown and ate a turkey",
        store: new RedisStore,
        resave: false,
        saveUninitialized: false
    }));


    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new passportLocal(User.authenticate()));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}

AuthController.prototype.signup = function(username, password, role, email, name, nationalId, address, phone) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        if (!_self.validator.validateEmptyOrWhiteSpace(username)) {
            reject(ERRORS.AUTH.USERNAME_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(password)) {
            reject(ERRORS.AUTH.PASSWORD_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(email)) {
            reject(ERRORS.AUTH.EMAIL_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(name)) {
            reject(ERRORS.AUTH.NAME_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(address)) {
            reject(ERRORS.AUTH.ADDRESS_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(phone)) {
            reject(ERRORS.AUTH.PHONE_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(role) || !_self.validator.findValue(ROLE, role)) {
            reject(ERRORS.AUTH.INVALID_ROLE);
            return;
        }

        if (role === ROLE.PROVIDER && !_self.validator.validateEmptyOrWhiteSpace(nationalId)) {
            reject(ERRORS.AUTH.NATIONALID_MISSING);
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

        if (role === ROLE.PROVIDER)
            user.nationalId = nationalId;

        User.register(user, new Buffer(password), function(err, account) {
            if (err)
                reject(err);
            else
                resolve(username);
        });
    });
}

AuthController.prototype.getInformation = function(providerUsername) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        if (!_self.validator.validateEmptyOrWhiteSpace(providerUsername)) {
            reject(ERRORS.AUTH.USERNAME_MISSING);
            return;
        }

        var information = {};

        User.findOne({
                name: providerUsername,
                role: ROLE.PROVIDER
            }, 'name')
            .then((result) => {
                if (!result || result.length === 0)
                    reject(ERRORS.AUTH.PROVIDER_NOT_FOUND);
                else {

                    information.name = result.name;
                    return getAverageRating(providerUsername);
                }
            })
            .then((average) => {
                information.average = average;
                resolve(information);
            })
            .catch((err) => reject(err));

    });
}

function getAverageRating(providerUsername) {

    return new Promise(function(resolve, reject) {
        offerModel.aggregate()
            .match({
                providerUsername: providerUsername,
                rating: { $gte: 1 }
            })
            .group({
                _id: '$rating',
                count: { $sum: 1 }
            })
            .then((result) => {
                if (result.length === 0)
                    resolve(0);
                else {
                    var total = 0;
                    var sum = 0;

                    result.forEach(function(element) {
                        sum += element._id * element.count;
                        total += element.count;
                    });

                    const oneDecimalPlace = 10;
                    var average = Math.round((sum / total) * oneDecimalPlace) / oneDecimalPlace;

                    resolve(average);
                }
            })
            .catch((err) => reject(err));
    });
}

module.exports = AuthController;