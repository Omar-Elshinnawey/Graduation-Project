const express = require('express'),
    bodyparser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    AuthController = require('./controllers/auth.controller'),
    dbConfig = require('./config/db.config'),
    orderApi = require('./api/order.api'),
    offerApi = require('./api/offer.api'),
    authAPi = require('./api/auth.api');

var app = express();

var auth = new AuthController(passport);

auth.setup(app);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

var port = process.env.PORT || 3000;

orderApi(app);
offerApi(app);
authAPi(app, auth);

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig());

app.listen(port);