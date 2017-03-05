var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var AuthController = require('./controllers/auth.controller');
const dbConfig = require('./config/db.config');



var orderApi = require('./api/order.api');
var offerApi = require('./api/offer.api');
var authAPi = require('./api/auth.api');

var app = express();

var auth = new AuthController(passport);

auth.setup(app);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

var port = process.env.port || 3000;

orderApi(app);
offerApi(app);
authAPi(app, auth);

mongoose.connect('mongodb://localhost/dakakenTest');

app.listen(port);

