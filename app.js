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

app.use(express.static('apidoc'));
app.use('/libs', express.static('node_modules'));
app.use('/assets', express.static('public'));

orderApi(app);
offerApi(app);
authAPi(app, auth);

app.get('/en*', function(req, res) {
    res.sendFile(__dirname + '/public/en.html');
});

mongoose.Promise = require('bluebird') /*global.Promise*/ ;

mongoose.connect(dbConfig());

app.listen(port);