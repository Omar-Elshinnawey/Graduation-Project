const passport = require('passport'),
    ERRORS = require('../constants/error.constant'),
    middlewares = require('../middlewares/auth.middlewar'),
    User = require('../models/user.model');

module.exports = function authApi(app, authController) {

    app.post('/auth/register', function(req, res) {

        authController.signup(
                req.body.username,
                req.body.password,
                req.body.role,
                req.body.email,
                req.body.name,
                req.body.nationalId,
                req.body.address,
                req.body.phone)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));
    });

    app.post('/auth/login', function(req, res) {

        passport.authenticate('local', function(err, user, info) {

            if (err || !user)
                return res.status(401).send(ERRORS.AUTH.INVALID_LOGIN);

            req.logIn(user, function(err) {
                if (err)
                    return res.status(401).send(ERRORS.AUTH.INVALID_LOGIN);

                var userobj = {};
                userobj.username = user.username;
                userobj.role = user.role;
                userobj.email = user.email;
                userobj.name = user.name;
                userobj.address = user.address;
                userobj.phone = user.phone;
                userobj.isbanned = user.isbanned;

                res.send(userobj);
            });
        })(req, res);
    });

    app.post('/auth/change', middlewares.isLoggedin, function(req, res) {

        passport.authenticate('local', function(err, user, info) {

            if (err || !user)
                return res.status(401).send(ERRORS.AUTH.INVALID_LOGIN);

            user.setPassword(req.body.newPassword, function(err, result) {
                if (err)
                    return res.status(401).send(ERRORS.AUTH.INVALID_LOGIN);

                user.save();

                var userobj = {};
                userobj.username = result.username;
                userobj.role = result.role;
                userobj.email = result.email;
                userobj.name = result.name;
                userobj.address = result.address;
                userobj.phone = result.phone;
                userobj.isbanned = result.isbanned;
                res.send(userobj);
            });
        })(req, res);

    });

    app.get('/auth/logout', function(req, res) {

        req.logout();
        res.send(true);
    });

    app.post('/auth/ban/:username', middlewares.isLoggedinAdmin, function(req, res) {

        authController.banUser(req.params.username)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));
    });

    app.get('/providers/:username', middlewares.isLoggedin, function(req, res) {

        authController.getInformation(req.params.username)
            .then((information) => res.send(information))
            .catch((err) => res.send(err));
    });
}