const Offer = require('../models/offer.model'),
    delivery = require('../models/delivery.model'),
    User = require('../models/user.model'),
    Validator = require('./validator.controller'),
    OFFER_STATES = require('../constants/offer-state.constant'),
    ERRORS = require('../constants/error.constant'),
    Promise = require('bluebird');

function Delivery() {
    this.validator = new Validator();
    this.DELIVERYDAYS = 3;
}

Delivery.prototype.create = function(providerUsername, offerId) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        if (!_self.validator.validateEmptyOrWhiteSpace(providerUsername)) {
            reject(ERRORS.OFFER.USERNAME_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(offerId)) {
            reject(ERRORS.OFFER.OFFERID_MISSING);
            return;
        }

        var fromAddress = '';
        var toAddress = '';

        Offer.findById(offerId).populate('orderId', 'customerUsername')
            .then((result) => {
                if (!result || result.length < 1)
                    reject(ERRORS.OFFER.OFFER_DOESNOT_EXIST);
                else if (providerUsername !== result.providerUsername)
                    reject(ERRORS.AUTH.NOT_AUTHERIZED);
                else if (result.state !== OFFER_STATES.ACCEPTED)
                    reject(ERRORS.OFFER.INVALID_DELIVERY);
                else {
                    User.findOne({ username: providerUsername }).select('address')
                        .then((provider) => {

                            fromAddress = provider.address;

                            User.findOne({ username: result.orderId[0].customerUsername }).select('address')
                                .then((customer) => {
                                    toAddress = customer.address;
                                    var expectedDate = new Date();
                                    expectedDate.setDate(expectedDate.getDate() + _self.DELIVERYDAYS);

                                    var newDelivery = delivery({
                                        orderId: result.orderId[0]._id,
                                        offerId: offerId,
                                        fromAddress: fromAddress,
                                        toAddress: toAddress,
                                        expectedDate: expectedDate
                                    });

                                    newDelivery.save();
                                    result.state = OFFER_STATES.ON_ROUTE;

                                    result.save()
                                    resolve('Success');
                                })
                                .catch((err) => reject(ERRORS.UNKOWN));
                        })
                        .catch((err) => reject(ERRORS.UNKOWN));
                }
            })
            .catch((err) => {
                console.log(err);
                reject(ERRORS.UNKOWN);
            });
    });
}

Delivery.prototype.updateState = function(offerId) {

    return new Promise(function(resolve, reject) {
        Offer.findByIdAndUpdate(offerId, { state: OFFER_STATES.DELIVERED })
            .then((result) => resolve('Success'))
            .catch((err) => reject(ERRORS.UNKOWN));
    });
}

Delivery.prototype.getDeliveries = function() {

    return new Promise(function(resolve, reject) {

        delivery.find()
            .select('fromAddress toAddress expectedDate')
            .then((result) => resolve(result))
            .catch((err) => reject(ERRORS.UNKOWN));
    });
}

Delivery.prototype.getDeliveryDetail = function(deliveryId) {

    return new Promise(function(resolve, reject) {

        delivery.findById(deliveryId)
            .populate('orderId offerId')
            .then((result) => resolve(result))
            .catch((err) => reject(ERRORS.UNKOWN));
    });
}

module.exports = Delivery;