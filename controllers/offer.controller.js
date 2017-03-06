const offerModel = require('../models/offer.model');
const orderModel = require('../models/order.model');

const ERRORS = require('../constants/error.constant');
const OFFER_STATE = require('../constants/offer-state.constant');

const Validator = require('../controllers/validator.controller');

function OfferController() {
    this.validator = new Validator();
}

OfferController.prototype.createOffer = function (providerUsername, orderId, price, description, callback) {

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

//this is for providers to get thier own offers.
OfferController.prototype.getOffersForProvider = function (providerUsername, callback) {

    if (!this.validator.validateEmptyOrWhiteSpace(providerUsername)) {

        callback(ERRORS.OFFER.USERNAME_MISSING, 'error');
        return;

    }

    offerModel.find(
        {
            providerUsername: providerUsername
        },
        'providerUsername price _id',
        function (err, result) {

            if (err)
                callback(err, 'error');
            else
                callback(null, result);

        });
}

//this is for customers to get offers for thier own order.
OfferController.prototype.getOffersForOrder = function (customerUsername, orderId, callback) {

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
                    'providerUsername price _id',
                    function (error, result) {

                        if (error)
                            callback(error, 'error');
                        else
                            callback(null, result);

                    });
            }
        });
}

OfferController.prototype.getOfferDetails = function (offerId, callback) {

    if (!this.validator.validateEmptyOrWhiteSpace(offerId)) {

        callback(ERRORS.OFFER.OFFERID_MISSING, 'error');
        return;
    }

    offerModel.findById(
        offerId,
        function (err, result) {

            if (err)
                callback(err, 'fail');
            else
                callback(null, result);
        });
}

OfferController.prototype.deleteOffer = function (providerUsername, offerId, callback) {

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

        });
}

OfferController.prototype.updateOffer = function (providerUsername, offerId, description, price, callback) {

    var offerToBeUpdated = {};

    if (!this.validator.validateEmptyOrWhiteSpace(providerUsername)) {
        callback(ERRORS.OFFER.USERNAME_MISSING, 'error');
        return;
    }

    if (!this.validator.validateEmptyOrWhiteSpace(offerId)) {
        callback(ERRORS.OFFER.OFFERID_MISSING, 'error');
        return;
    }

    if (this.validator.validateEmptyOrWhiteSpace(price) && (price < 0 || isNaN(price))) {

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
            _id: offerId,
            state: OFFER_STATE.ACTIVE
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

OfferController.prototype.acceptOffer = function (customerUsername, offerId, callback) {

    if (!this.validator.validateEmptyOrWhiteSpace(customerUsername)) {

        callback(ERRORS.OFFER.USERNAME_MISSING, 'error');
        return;

    }

    if (!this.validator.validateEmptyOrWhiteSpace(offerId)) {

        callback(ERRORS.OFFER.OFFERID_MISSING, 'error');
        return;

    }

    offerModel.findOne(
        {
            _id: offerId
        },
        function (err, result) {

            if (err)
                callback(err, 'fail');

            else {

                switch (result.state) {

                    case OFFER_STATE.ACCEPTED:
                        callback(ERRORS.OFFER.OFFER_ALREADY_ACCEPTED, 'fail');
                        break;

                    case OFFER_STATE.CLOSED:
                        callback(ERRORS.OFFER.OFFER_CLOSED, 'fail');
                        break;

                    default:

                        orderModel.count(
                            {
                                _id: result.orderId,
                                customerUsername: customerUsername
                            },
                            function (err2, count) {

                                if (err2)
                                    callback(err2, 'fail');

                                else
                                    if (count <= 0)
                                        callback(ERRORS.OFFER.ORDER_DOESNOT_EXIST, 'fail');

                                    else {

                                        var hasError = false;

                                        offerModel.update(
                                            {
                                                orderId: result.orderId,
                                                _id: { "$ne": result._id }
                                            },
                                            { state: OFFER_STATE.CLOSED },
                                            { multi: true },
                                            function (err, docs) {

                                                if (err) {
                                                    callback(err, 'fail');
                                                    hasError = true;
                                                }
                                            });

                                        if (!hasError) {

                                            result.state = OFFER_STATE.ACCEPTED;

                                            result.save(function (err3, doc, nbAffected) {
                                                if (nbAffected === 1)
                                                    callback(null, 'accepted');
                                                else
                                                    callback(ERRORS.UNKOWN, 'fail');
                                            });
                                        }
                                    }
                            });
                }
            }
        });
}

OfferController.prototype.rateOffer = function (customerUsername, offerId, review, rating, callback) {

    offerModel.findOne(
        { _id: offerId },
        function (err, result) {

            if (err)
                callback(err, 'fail');

            else {

                if (result.state === OFFER_STATE.DELIVERED) {

                    orderModel.count(
                        {
                            _id: result.orderId,
                            customerUsername: customerUsername
                        },
                        function (err, count) {

                            if (err)
                                callback(err, 'fail');

                            else {

                                if (count === 1) {

                                    result.rating = rating;
                                    result.review = review;

                                    result.save(function (error, doc, nbAffected) {

                                        if (nbAffected === 1)
                                            callback(null, 'success');
                                        else
                                            callback(ERRORS.UNKOWN, 'fail');

                                    });
                                }
                            }
                        });

                } else
                    callback(ERRORS.OFFER.INVALID_RATING, 'fail');
            }
        });
}

module.exports = OfferController;