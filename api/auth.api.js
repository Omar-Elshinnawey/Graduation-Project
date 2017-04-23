const passport = require('passport'),
    ERRORS = require('../constants/error.constant');
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

                res.send(userobj);
            });
        })(req, res);
    });

    app.post('/auth/change', function(req, res) {

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
                res.send(userobj);
            });
        })(req, res);

    });

    app.get('/auth/logout', function(req, res) {

        req.logout();
        res.send(true);
    });

    app.get('/providers/:username', function(req, res) {

        authController.getInformation(req.params.username)
            .then((information) => res.send(information))
            .catch((err) => res.send(err));
    });
}