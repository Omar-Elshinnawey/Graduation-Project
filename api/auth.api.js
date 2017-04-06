const passport = require('passport');
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

    app.post('/auth/login',
        passport.authenticate(
            "local", {
                failureRedirect: "/auth/failed"
            }),
        function(req, res) {
            res.send(req.user.username);
        });

    app.get('/auth/logout', function(req, res) {

        req.logout();
        res.send(true);
    });

    app.get('/auth/failed', function(req, res) {

        res.send(false);

    });

    app.get('/providers/:username', function(req, res) {

        authController.getInformation(req.params.username)
            .then((information) => res.send(information))
            .catch((err) => res.send(err));
    });
}