const storage = require('cloudinary'),
    config = require('../config/storage.config.json'),
    DataUri = require('datauri'),
    Promise = require('bluebird');

storage.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret
});

function Storage() {};

Storage.prototype.upload = function(file) {

    return new Promise(function(resolve, reject) {
        var dataUri = new DataUri();
        dataUri.format('.png', file);

        storage.uploader.upload(dataUri.content, function(result) {
            if (!result)
                reject('error');
            else
                resolve(result.secure_url);
        });
    });
}

module.exports = Storage;