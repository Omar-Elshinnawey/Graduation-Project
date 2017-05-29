const PaymentInterface = require('../externals/payment'),
    DeliveryController = require('./delivery.controller'),
    offerModel = require('../models/offer.model'),
    orderModel = require('../models/order.model'),
    paymentModel = require('../models/payment.model'),
    refundModel = require('../models/refund.model'),
    ERRORS = require('../constants/error.constant'),
    OFFER_STATE = require('../constants/offer-state.constant'),
    ORDER_STATE = require('../constants/order-state.constant'),
    REFUND_TYPE = require('../constants/refund.constant'),
    REFUND_STATE = require('../constants/refund-state.constant'),
    CATEGORIES = require('../constants/category.constant'),
    cloudinary = require('../externals/storage'),
    Validator = require('../controllers/validator.controller'),
    Promise = require('bluebird');

function OfferController() {
    this.validator = new Validator();
    this.storage = new cloudinary();
}

//for providers==============================================================================

OfferController.prototype.createOffer = function(providerUsername, orderId, price, description, image) {

    var _self = this;

    return new Promise(function(resolve, reject) {
        if (!_self.validator.validateEmptyOrWhiteSpace(providerUsername)) {
            reject(ERRORS.OFFER.USERNAME_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(orderId)) {
            reject(ERRORS.OFFER.ORDERID_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(price) || isNaN(price) || price <= 0) {
            reject(ERRORS.OFFER.INVALID_PRICE);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(description)) {
            reject(ERRORS.OFFER.DESCRIPTION_MISSING);
            return;
        }

        if (!image) {
            reject(ERRORS.OFFER.PICTURE_MISSING);
            return;
        }

        _self.storage.upload(image.buffer)
            .then((path) => {

                orderModel.count({
                        _id: orderId,
                        state: ORDER_STATE.ACTIVE
                    })
                    .then((count) => {
                        if (count === 0)
                            reject(ERRORS.OFFER.ORDER_DOESNOT_EXIST);
                        else {
                            return offerModel.count({
                                orderId: orderId,
                                providerUsername: providerUsername
                            });
                        }
                    })
                    .then((count) => {

                        if (count > 0) {
                            reject(ERRORS.OFFER.DUPLICATE_OFFER);
                        } else {
                            var offer = offerModel({
                                providerUsername: providerUsername,
                                orderId: orderId,
                                price: price,
                                description: description,
                                state: OFFER_STATE.ACTIVE,
                                picture: path
                            });

                            offer.save()
                                .then(resolve('Success'));
                        }
                    })
                    .catch((err) => reject(ERRORS.UNKOWN));

            }).catch((err) => reject(ERRORS.UNKOWN));
    });
}

OfferController.prototype.getOffersForProvider = function(providerUsername) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        if (!_self.validator.validateEmptyOrWhiteSpace(providerUsername)) {
            reject(ERRORS.OFFER.USERNAME_MISSING);
            return;
        }

        offerModel.find({
                    providerUsername: providerUsername
                },
                'providerUsername price state orderId')
            .populate('orderId', 'title')
            .then((result) => resolve(result))
            .catch((err) => reject(ERRORS.UNKOWN));
    });
}

OfferController.prototype.deleteOffer = function(providerUsername, offerId) {

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

        offerModel.findOneAndRemove({
                _id: offerId,
                providerUsername: providerUsername,
                state: OFFER_STATE.ACTIVE
            })
            .then(resolve('Success'))
            .catch((err) => reject(ERRORS.UNKOWN));
    });
}

OfferController.prototype.updateOffer = function(providerUsername, offerId, description, price) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        var offerToBeUpdated = {};

        if (!_self.validator.validateEmptyOrWhiteSpace(providerUsername)) {
            reject(ERRORS.OFFER.USERNAME_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(offerId)) {
            reject(ERRORS.OFFER.OFFERID_MISSING);
            return;
        }

        if (_self.validator.validateEmptyOrWhiteSpace(price) && (price < 0 || isNaN(price))) {
            reject(ERRORS.OFFER.INVALID_PRICE);
            return;
        }

        if (_self.validator.validateEmptyOrWhiteSpace(price)) {
            offerToBeUpdated.price = price;
        }

        if (_self.validator.validateEmptyOrWhiteSpace(description)) {
            offerToBeUpdated.description = description;
        }

        offerModel.findOneAndUpdate({
                    providerUsername: providerUsername,
                    _id: offerId,
                    state: OFFER_STATE.ACTIVE
                },
                offerToBeUpdated)
            .then(resolve('Updated'))
            .catch((err) => reject(ERRORS.UNKOWN));
    });
}

OfferController.prototype.submitForDelivary = function(providerUsername, offerId) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        var deliverController = new DeliveryController();

        deliverController.create(providerUsername, offerId)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
}

//for customers=========================================================================
OfferController.prototype.getOffersForOrder = function(customerUsername, orderId) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        if (!_self.validator.validateEmptyOrWhiteSpace(customerUsername)) {
            reject(ERRORS.OFFER.USERNAME_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(orderId)) {
            reject(ERRORS.OFFER.ORDERID_MISSING);
            return;
        }

        orderModel.count({ _id: orderId, customerUsername: customerUsername })
            .then((count) => {
                if (count === 0)
                    reject(ERRORS.OFFER.ORDER_DOESNOT_EXIST);
                else {
                    offerModel.find({
                                orderId: orderId
                            },
                            'providerUsername price state _id')
                        .then((result) => resolve(result))
                }
            })
            .catch((err) => reject(err));
    });
}

OfferController.prototype.acceptOffer = function(customerUsername, offerId, paymentObject) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        if (!_self.validator.validateEmptyOrWhiteSpace(customerUsername)) {
            reject(ERRORS.OFFER.USERNAME_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(offerId)) {
            reject(ERRORS.OFFER.OFFERID_MISSING);
            return;
        }

        if (!paymentObject ||
            !_self.validator.validateEmptyOrWhiteSpace(paymentObject.emonth) ||
            !_self.validator.validateEmptyOrWhiteSpace(paymentObject.eyear) ||
            !_self.validator.validateEmptyOrWhiteSpace(paymentObject.cvc) ||
            !_self.validator.validateEmptyOrWhiteSpace(paymentObject.number)) {

            reject(ERRORS.OFFER.INVALID_PAYMENT_INFO);
            return;
        }

        offerModel.findOne({ _id: offerId })
            .populate('orderId', 'customerUsername')
            .then((result) => {

                if (result.orderId[0].customerUsername !== customerUsername)
                    reject(ERRORS.OFFER.ORDER_DOESNOT_EXIST);
                else {

                    switch (result.state) {

                        case OFFER_STATE.ACCEPTED:
                            reject(ERRORS.OFFER.OFFER_ALREADY_ACCEPTED);
                            break;

                        case OFFER_STATE.CLOSED:
                            reject(ERRORS.OFFER.OFFER_CLOSED);
                            break;
                        default:
                            paymentObject.amount = result.price * 100;
                            PaymentInterface
                                .makePayment(paymentObject)
                                .then((data) => {

                                    orderModel.findByIdAndUpdate(
                                        result.orderId[0]._id, { state: ORDER_STATE.CLOSED }).exec();

                                    offerModel.update({
                                        orderId: result.orderId,
                                        _id: { "$ne": result._id }
                                    }, { state: OFFER_STATE.CLOSED }, { multi: true }).exec();

                                    result.state = OFFER_STATE.ACCEPTED;
                                    result.save();

                                    payment = paymentModel({
                                        orderId: result.orderId[0]._id,
                                        offerId: result._id,
                                        date: Date.now(),
                                        paymentId: data.id
                                    });

                                    payment.save();

                                    resolve('Success');
                                });
                    }
                }
            })
            .catch((err) => reject(ERRORS.UNKOWN));
    });
}

OfferController.prototype.rateOffer = function(customerUsername, offerId, review, rating) {

    var _self = this;

    return new Promise(function(resolve, reject) {


        if (!_self.validator.validateEmptyOrWhiteSpace(customerUsername)) {
            reject(ERRORS.OFFER.USERNAME_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(offerId)) {
            reject(ERRORS.OFFER.OFFERID_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(rating) || rating < 1 || rating > 5) {
            reject(ERRORS.OFFER.INVALID_RATING);
            return;
        }

        offerModel.findOne({ _id: offerId })
            .populate('orderId', 'customerUsername')
            .then((result) => {

                if (!result || result.length === 0 || result.state !== OFFER_STATE.DELIVERED)
                    reject(ERRORS.OFFER.INVALID_RATING);
                else {
                    if (result.orderId[0].customerUsername !== customerUsername)
                        reject(ERRORS.OFFER.ORDER_DOESNOT_EXIST);
                    else {

                        result.rating = rating;
                        result.review = review;

                        result.save().then(resolve('Success'));
                    }
                }
            })
            .catch((err) => reject(ERRORS.UNKOWN));
    });
}

OfferController.prototype.requestRefund = function(customerUsername, offerId, type, reason) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        if (!_self.validator.validateEmptyOrWhiteSpace(customerUsername)) {
            reject(ERRORS.OFFER.USERNAME_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(offerId)) {
            reject(ERRORS.OFFER.OFFERID_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(reason)) {
            reject(ERRORS.OFFER.REFUND_REASON_MISSING);
            return;
        }

        refundModel.count({ offerId: offerId })
            .then((count) => {
                if (count >= 1)
                    reject(ERRORS.OFFER.ALREADY_REQUESTED_REFUND);
                else {
                    offerModel.findOne({
                            _id: offerId,
                            state: OFFER_STATE.DELIVERED
                        })
                        .populate('orderId', 'customerUsername')
                        .then((result) => {
                            if (!result || result.length < 1 || result.orderId[0].customerUsername !== customerUsername)
                                reject(ERRORS.OFFER.OFFER_DOESNOT_EXIST);
                            else {

                                var refundRequest = refundModel({
                                    offerId: offerId,
                                    type: type,
                                    reason: reason,
                                    date: Date.now(),
                                    state: REFUND_STATE.ACTIVE
                                });

                                refundRequest.save();

                                resolve('Success');
                            }
                        });
                }
            })
            .catch((err) => reject(ERRORS.UNKOWN));
    });
}

//for admins==============================================================================
OfferController.prototype.adminDeleteOffer = function(offerId) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        if (!_self.validator.validateEmptyOrWhiteSpace(offerId)) {
            reject(ERRORS.OFFER.OFFERID_MISSING);
            return;
        }

        offerModel.findOneAndRemove({
                _id: offerId,
                state: OFFER_STATE.ACTIVE
            })
            .then(resolve('Success'))
            .catch((err) => reject(ERRORS.UNKOWN));
    });
}

OfferController.prototype.adminGetOffersForOrder = function(orderId) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        if (!_self.validator.validateEmptyOrWhiteSpace(orderId)) {
            reject(ERRORS.OFFER.ORDERID_MISSING);
            return;
        }

        offerModel.find({
                    orderId: orderId
                },
                'providerUsername price state _id')
            .then((result) => resolve(result))

        .catch((err) => reject(ERRORS.UNKOWN));
    });
}

OfferController.prototype.getRefundRequests = function() {

    return new Promise(function(resolve, reject) {

        refundModel.find().select('date type state reason').sort({ state: -1 })
            .then((result) => resolve(result))
            .catch((err) => reject(ERRORS.UNKOWN));
    });
}

OfferController.prototype.getRefundDetail = function(refundId) {

    return new Promise(function(resolve, reject) {
        refundModel.findById(orderId)
            .then((result) => resolve(result))
            .catch((err) => reject(ERRORS.UNKOWN));
    });
}

OfferController.prototype.acceptRefund = function(refundId) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        if (!_self.validator.validateEmptyOrWhiteSpace(refundId)) {
            reject(ERRORS.OFFER.REFUNDID_MISSING);
            return;
        }

        refundModel.findById(refundId).populate('offerId', 'price')
            .then((refund) => {
                if (!refund || refund.length < 1)
                    reject(ERRORS.OFFER.NO_REFUND_FOUND);
                else if (refund.state === REFUND_STATE.ACCEPTED) {
                    reject(ERRORS.OFFER.ALREADY_REQUESTED_REFUND);
                } else {
                    paymentModel.findOne({ offerId: refund.offerId }, 'paymentId')
                        .then((payment) => {
                            if (!payment || payment.length < 1)
                                reject(ERRORS.OFFER.NO_REFUND_FOUND);
                            else
                                PaymentInterface.refund(payment.paymentId, refund.offerId[0].price * 100)
                                .then((data) => {
                                    refund.state = REFUND_STATE.ACCEPTED;
                                    refund.save();
                                    resolve('Success');
                                })
                                .catch((err) => reject(ERRORS.UNKOWN));
                        });
                }
            })
    });
}

OfferController.prototype.rejectRefund = function(refundId) {

    var _self = this;

    return new Promise(function(resolve, reject) {
        if (!_self.validator.validateEmptyOrWhiteSpace(refundId)) {
            reject(ERRORS.OFFER.REFUNDID_MISSING);
            return;
        }

        refundModel.findByIdAndUpdate(refundId, { state: REFUND_STATE.DENIED })
            .then((result) => resolve('Success'))
            .catch((err) => reject(ERRORS.UNKOWN));
    });
}

//for all=================================================================================

OfferController.prototype.getOfferDetails = function(offerId) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        if (!_self.validator.validateEmptyOrWhiteSpace(offerId)) {
            reject(ERRORS.OFFER.OFFERID_MISSING);
            return;
        }

        offerModel.findById(offerId)
            .populate('orderId', 'customerUsername')
            .then((result) => resolve(result))
            .catch((err) => reject(ERRORS.UNKOWN));

    });
}

OfferController.prototype.getTopProviders = function(category) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        if (!_self.validator.validateEmptyOrWhiteSpace(category) || !_self.validator.findValue(CATEGORIES, category)) {
            reject(ERRORS.OFFER.CATEGORY_REQUIRED);
            return
        }

        offerModel.aggregate()
            .unwind('orderId')
            .lookup({
                from: orderModel.collection.name,
                localField: 'orderId',
                foreignField: '_id',
                as: 'order'
            })
            .unwind('order')
            .group({
                _id: '$_id',
                providerUsername: { '$first': '$providerUsername' },
                rating: { '$first': '$rating' },
                category: { '$first': '$order.Category' }
            })
            .match({ rating: { $gte: 1 }, category: { $eq: Number(category) } })
            .group({
                _id: {
                    providerUsername: '$providerUsername',
                    rating: '$rating'
                },
                total: { $sum: 1 }
            })
            .group({
                _id: '$_id.providerUsername',
                total: { $sum: { $multiply: ['$_id.rating', '$total'] } },
                all: { $sum: '$total' }
            })
            .project({
                'total': { $divide: ['$total', '$all'] }
            })
            .sort({ total: -1 })
            .limit(5)
            .then((result) => resolve(result))
            .catch((err) => reject(ERRORS.UNKOWN));
    });
}

module.exports = OfferController;