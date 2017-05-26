const passport = require('passport'),
    ERRORS = require('../constants/error.constant'),
    ROLES = require('../constants/role.constant'),
    middlewares = require('../middlewares/auth.middlewar'),
    User = require('../models/user.model');

module.exports = function authApi(app, authController) {

    /**
     * @api {post} /auth/register register new user
     * @apiGroup Authentication
     * @apiDescription
     * Register a new user
     * @apiParam {String} username
     * @apiParam {String} password
     * @apiParam {number=1,2,3} role 1 for customer 2 for provider and 3 for delivery
     * @apiParam {String} email The new user's email
     * @apiParam {String} name The new user's name
     * @apiParam {String} nationalId The new user's National Id, required only when role is provider
     * @apiParam {String} address The new user's address
     * @apiParam {String} phone The new user's phone
     * @apiSuccess {String} username
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  'new Username'
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
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
            .catch((err) => res.status(500).send(err));
    });

    /**
     * @api {post} /auth/login Login
     * @apiGroup Authentication
     * @apiDescription
     * Login
     * @apiParam {String} username
     * @apiParam {String} password
     * @apiSuccess {String} username
     * @apiSuccess {number=0,1,2,3} role The role of the user
     * @apiSuccess {String} email The email of the user
     * @apiSuccess {String} name The name of the user
     * @apiSuccess {String} address The address of the user
     * @apiSuccess {String} phone The phone of the user
     * @apiSuccess {boolean} isbanned Indicates if the user is banned or not
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  {
     *      "username": "new username",
     *      "role": 1,
     *      "email": "email@email",
     *      "name": "new user name"
     *      "address": "new user address",
     *      "phone": "0500000000",
     *      "isbanned": false
     *  }
     * @apiError (Error 401) {String} code The error code
     * @apiError (Error 401) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 401 Unauthorized
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
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

    /**
     * @api {post} /auth/change Change Password
     * @apiGroup Authentication
     * @apiDescription
     * Change password of the user
     * @apiParam {String} username
     * @apiParam {String} password The old password
     * @apiParam {String} newPassword The new password
     * @apiSuccess {String} username
     * @apiSuccess {number=0,1,2,3} role The role of the user
     * @apiSuccess {String} email The email of the user
     * @apiSuccess {String} name The name of the user
     * @apiSuccess {String} address The address of the user
     * @apiSuccess {String} phone The phone of the user
     * @apiSuccess {boolean} isbanned Indicates if the user is banned or not
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  {
     *      "username": "new username",
     *      "role": 1,
     *      "email": "email@email",
     *      "name": "new user name"
     *      "address": "new user address",
     *      "phone": "0500000000",
     *      "isbanned": false
     *  }
     * @apiError (Error 401) {String} code The error code
     * @apiError (Error 401) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 401 Unauthorized
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
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

    /**
     * @api {get} /auth/logout Logout
     * @apiGroup Authentication
     * @apiDescription
     * Logout
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  'true'
     */
    app.get('/auth/logout', function(req, res) {

        req.logout();
        res.send(true);
    });

    /**
     * @api {post} /auth/ban/:username Ban a user
     * @apiGroup Admin functions
     * @apiDescription
     * Administrator ban a user
     * @apiParam {String} username The username of the user to be banned
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  'Success'
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal server error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.post('/auth/ban/:username', middlewares.isLoggedinAdmin, function(req, res) {

        authController.banUser(req.params.username)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));
    });

    /**
     * @api {post} /auth/unban/:username Unban a user
     * @apiGroup Admin functions
     * @apiDescription
     * Administrator unban a user
     * @apiParam {String} username The username of the user to be banned
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  'Success'
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal server error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.post('/auth/unban/:username', middlewares.isLoggedinAdmin, function(req, res) {
        authController.unbanUser(req.params.username)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));
    })

    /**
     * @api {get} /auth/users Get users
     * @apiGroup Admin functions
     * @apiDescription
     * Get all users
     * @apiSuccess {String} username The user's username
     * @apiSuccess {Number=0,1,2,3} role The role of the user
     * @apiSuccess {Boolean} isbanned Is the user banned? 
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  [{
     *      "username": "username",
     *      "role": 1,
     *      "isbanned": false
     *  }]
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal server error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.get('/auth/users', middlewares.isLoggedinAdmin, function(req, res) {
        authController.getUsers()
            .then((users) => res.send(users))
            .catch((err) => res.status(500).send(err));
    });

    /**
     * @api {get} /providers/:username Get provider information
     * @apiGroup General
     * @apiDescription
     * Get provider information
     * @apiSuccess {String} name The provider username
     * @apiSuccess {Number} average The average rating of the user
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  {
     *      "name": "username",
     *      "average": 3.4
     *  }
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal server error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.get('/providers/:username', middlewares.isLoggedin, function(req, res) {

        authController.getInformation(req.params.username)
            .then((information) => res.send(information))
            .catch((err) => res.status(500).send(err));
    });

    app.get('/auth/isAuth', function(req, res) {

        if (req.isAuthenticated()) {
            if (req.user.role === ROLES.ADMIN)
                res.send(true);
            else
                res.status(401).send(ERRORS.AUTH.NOT_AUTHERIZED);
        } else {
            res.status(401).send(ERRORS.AUTH.NOT_AUTHENTICATED);
        }

    });
}