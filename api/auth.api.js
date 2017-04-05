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
            req.body.phone,
            function(err, result) {

                if (err)
                    res.send(err);
                else
                    res.send(result);
            }
        )

    });

    app.post('/auth/login',
        authController.passport.authenticate(
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
        authController.getInformation(req.params.username, function(err, information) {
            if (err)
                res.send(err);
            else
                res.send(information);
        });
    });
}