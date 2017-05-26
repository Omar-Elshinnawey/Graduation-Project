const express = require('express'),
    helmet = require('helmet'),
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
/*security settings */

app.use(helmet());

//uncomment when deploying
/*app.set('trust proxy', true); <--- not sure about this TODO: Try removing it later

app.all('*', ensureSecure)

function ensureSecure(req, res, next) {
    if (req.headers["x-forwarded-proto"] === 'https')
        return next();

    res.redirect('https://' + req.hostname + req.url);
}*/

var port = process.env.PORT || 3000;

app.use('/docs', express.static('apidoc'));
app.use('/libs', express.static('node_modules'));
app.use('/assets', express.static('public'));

orderApi(app);
offerApi(app);
authAPi(app, auth);

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

mongoose.Promise = require('bluebird') /*global.Promise*/ ;

mongoose.connect(dbConfig());

app.listen(port);