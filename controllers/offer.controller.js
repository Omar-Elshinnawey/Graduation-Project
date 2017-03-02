var OFFER_STATE = require('../models/offer-state.model');
var offerModel = require('../models/offer.model');
var orderModel = require('../models/order.model');
var ERRORS = require('../models/error.model');

var Validator = require('../controllers/validator.controller');

module.exports = class OfferController {

    constructor() {
        this.validator = new Validator();
    }

    createOffer(providerUsername, orderId, price, description, callback) {

        if (!this.validator.validateEmptyOrWhiteSpace(providerUsername)) {

            callback(ERRORS.OFFER.USERNAME_MISSING, 'error');
            return;

        }

        if (!this.validator.validateEmptyOrWhiteSpace(orderId)) {

            callback(ERRORS.OFFER.ORDERID_MISSING, 'error');
            return;
        }

        if (!this.validator.validateEmptyOrWhiteSpace(price) || isNaN(price) || price < 0) {

            callback(ERRORS.OFFER.INVALID_PRICE, 'error');
            return;

        }

        if (!this.validator.validateEmptyOrWhiteSpace(description)) {

            callback(ERRORS.OFFER.DESCRIPTION_MISSING, 'error');
            return;

        }

        orderModel.count(
            {
                _id: orderId
            },
            function (err, count) {

                if (count === 0 || err)

                    callback(ERRORS.OFFER.ORDER_DOESNOT_EXIST, 'error');

                else {

                    var offer = offerModel({

                        providerUsername: providerUsername,
                        orderId: orderId,
                        price: price,
                        description: description,
                        state: OFFER_STATE.ACTIVE

                    });

                    offer.save(function (err) {

                        if (err)
                            callback(err, 'fail');
                        else
                            callback(null, 'Success');

                    });
                }
            });
    }

    getOffersForProvider(providerUsername, callback) {

        if (!this.validator.validateEmptyOrWhiteSpace(providerUsername)) {

            callback(ERRORS.OFFER.USERNAME_MISSING, 'error');
            return;

        }

        offerModel.find(
            {
                providerUsername: providerUsername
            },
            function (err, result) {

                if (err)
                    callback(err, 'error');
                else
                    callback(null, result);

            });

    }

    getOffersForOrder(customerUsername, orderId, callback) {

        if (!this.validator.validateEmptyOrWhiteSpace(customerUsername)) {

            callback(ERRORS.OFFER.USERNAME_MISSING, 'error');
            return;

        }

        if (!this.validator.validateEmptyOrWhiteSpace(orderId)) {

            callback(ERRORS.OFFER.ORDERID_MISSING, 'error');
            return;

        }

        orderModel.count(
            {
                _id: orderId
            },
            function (err, count) {

                if (count === 0 || err)

                    callback(ERRORS.OFFER.ORDER_DOESNOT_EXIST, 'error');

                else {

                    offerModel.find(
                        {
                            orderId: orderId
                        },
                        function (err, result) {

                            if (err)
                                callback(err, 'error');
                            else
                                callback(null, result);

                        });
                }
            });

    }

    deleteOffer(providerUsername, offerId, callback) {

        if (!this.validator.validateEmptyOrWhiteSpace(providerUsername)) {

            callback(ERRORS.OFFER.USERNAME_MISSING, 'error');
            return;

        }

        if (!this.validator.validateEmptyOrWhiteSpace(offerId)) {

            callback(ERRORS.OFFER.OFFERID_MISSING, 'error');
            return;

        }

        offerModel.findOneAndRemove(
            {
                _id: offerId,
                providerUsername: providerUsername,
                state: OFFER_STATE.ACTIVE
            },
            function (err, result) {

                if (err)
                    callback(err, 'error');
                else
                    callback(null, result);

            }
        )

    }

    updateOffer(providerUsername, offerId, description, price, callback) {

        var offerToBeUpdated = {};

        if (!this.validator.validateEmptyOrWhiteSpace(providerUsername)) {
            callback(ERRORS.OFFER.USERNAME_MISSING, 'error');
            return;
        }

        if (!this.validator.validateEmptyOrWhiteSpace(offerId)) {
            callback(ERRORS.OFFER.OFFERID_MISSING, 'error');
            return;
        }

        if (this.validator.validateEmptyOrWhiteSpace(price) &&  (price < 0 || isNaN(price))) {

            callback(ERRORS.OFFER.INVALID_PRICE, 'error');
            return;

        }

        if (this.validator.validateEmptyOrWhiteSpace(price)) {
            offerToBeUpdated.price = price;
        }

        if (this.validator.validateEmptyOrWhiteSpace(description)) {
            offerToBeUpdated.description = description;
        }

        offerModel.findOneAndUpdate(
            {
                providerUsername: providerUsername,
                _id: offerId
            },
            offerToBeUpdated
            ,
            function (err, result) {

                if (err)
                    callback(err, 'failed');
                else
                    callback(null, 'updated');

            });

    }
}