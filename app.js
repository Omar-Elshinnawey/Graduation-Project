const express = require('express'),
    bodyparser = require('body-parser'),
    mongoose = require('mongoose'),
    AuthController = require('./controllers/auth.controller'),
    dbConfig = require('./config/db.config'),
    orderApi = require('./api/order.api'),
    offerApi = require('./api/offer.api'),
    authAPi = require('./api/auth.api');

var app = express();

var auth = new AuthController();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

auth.setup(app);

var port = process.env.PORT || 3000;

orderApi(app);
offerApi(app);
authAPi(app, auth);
//TODO: USE bluebird!! SAVE YOURSELF FROM CALLBACK HELL!!
mongoose.Promise = require('bluebird') /*global.Promise*/ ;

mongoose.connect(dbConfig());

app.listen(port);