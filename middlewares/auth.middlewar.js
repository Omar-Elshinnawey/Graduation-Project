const ERRORS = require('../constants/error.constant'),
    ROLES = require('../constants/role.constant');

module.exports = {

    isLoggedin: function(req, res, next) {
        if (req.isAuthenticated())
            return next();

        return res.status(401).send(ERRORS.AUTH.NOT_AUTHENTICATED);
    },

    isLoggedinCustomer: function(req, res, next) {
        if (req.isAuthenticated() && req.user.role === ROLES.CUSTOMER)
            return next();

        req.logout();
        return res.status(401).send(ERRORS.AUTH.NOT_AUTHENTICATED);
    },

    isLoggedinCustomerNotBanned: function(req, res, next) {
        if (req.isAuthenticated() && req.user.role === ROLES.CUSTOMER)
            if (!req.user.isbanned)
                return next();
            else
                return res.status(401).send(ERRORS.AUTH.USER_BANNED);

        req.logout();
        return res.status(401).send(ERRORS.AUTH.NOT_AUTHENTICATED);
    },

    isLoggedinProvider: function(req, res, next) {
        if (req.isAuthenticated() && req.user.role === ROLES.PROVIDER)
            return next();

        req.logout();
        return res.status(401).send(ERRORS.AUTH.NOT_AUTHENTICATED);
    },

    isLoggedinProviderNotBanned: function(req, res, next) {
        if (req.isAuthenticated() && req.user.role === ROLES.PROVIDER)
            if (!req.user.isbanned)
                return next();
            else
                return res.status(401).send(ERRORS.AUTH.USER_BANNED);

        req.logout();
        return res.status(401).send(ERRORS.AUTH.NOT_AUTHENTICATED);
    },

    isLoggedinAdmin: function(req, res, next) {
        if (req.isAuthenticated() && req.user.role === ROLES.ADMIN)
            return next();

        req.logout();
        return res.status(401).send(ERRORS.AUTH.NOT_AUTHENTICATED);
    },

    isLoggedinAdminOrProvider: function(req, res, next) {
        if (req.isAuthenticated() && (req.user.role === ROLES.PROVIDER || req.user.role === ROLES.ADMIN))
            return next();

        req.logout();
        return res.status(401).send(ERRORS.AUTH.NOT_AUTHENTICATED);
    }
}