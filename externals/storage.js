const storage = require('cloudinary'),
    config = require('../config/storage.config.json');

storage.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret
});

function Storage() {};

Storage.prototype.upload = function() {
    storage.uploader.upload('./externals/result.png', function(result) {
        console.log(result);
    });
}

module.exports = Storage;