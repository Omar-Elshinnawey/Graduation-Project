const orderModel = require('../models/order.model'),
    ORDER_STATE = require('../constants/order-state.constant'),
    CATEGORIES = require('../constants/category.constant'),
    ERRORS = require('../constants/error.constant'),
    Validator = require('../controllers/validator.controller'),
    Promise = require('bluebird'),
    cloudinary = require('../externals/storage');

function OrderController() {
    this.validator = new Validator();
    this.storage = new cloudinary();
}

//for customers=====================================================================================
OrderController.prototype.createOrder = function(customerUsername, description, Category, title, image) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        if (!_self.validator.validateEmptyOrWhiteSpace(customerUsername)) {
            reject(ERRORS.ORDER.USERNAME_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(description)) {
            reject(ERRORS.ORDER.DESCRIPTION_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(title)) {
            reject(ERRORS.ORDER.TITLE_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(Category) || !_self.validator.findValue(CATEGORIES, Category)) {
            reject(ERRORS.ORDER.INVALID_CATEGORY);
            return;
        }

        if (image) {
            _self.storage.upload(image.buffer)
                .then((path) => {
                    var order = orderModel({
                        customerUsername: customerUsername,
                        description: description,
                        Category: Category,
                        title: title,
                        state: ORDER_STATE.ACTIVE,
                        picture: path
                    });

                    order.save()
                        .then(resolve('Success'))
                        .catch((err) => reject(ERRORS.UNKOWN));
                })
                .catch((err) => reject(ERRORS.UNKOWN));
        } else {

            var order = orderModel({
                customerUsername: customerUsername,
                description: description,
                Category: Category,
                title: title,
                state: ORDER_STATE.ACTIVE,
            });

            order.save()
                .then(resolve('Success'))
                .catch((err) => reject(ERRORS.UNKOWN));
        }


    });
}

OrderController.prototype.getOrdersForCustomer = function(customerUsername) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        if (!_self.validator.validateEmptyOrWhiteSpace(customerUsername)) {
            reject(ERRORS.ORDER.USERNAME_MISSING);
            return;
        }

        orderModel.find({ customerUsername: customerUsername }, 'title _id state')
            .then((result) => resolve(result))
            .catch((err) => reject(ERRORS.UNKOWN));
    });
}

OrderController.prototype.deleteOrder = function(customerUsername, orderId) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        if (!_self.validator.validateEmptyOrWhiteSpace(customerUsername)) {
            reject(ERRORS.ORDER.USERNAME_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(orderId)) {
            reject(ERRORS.ORDER.ORDERID_MISSING);
            return;
        }

        orderModel.findOneAndRemove({
                _id: orderId,
                customerUsername: customerUsername,
                state: ORDER_STATE.ACTIVE
            })
            .then(resolve('Success'))
            .catch((err) => reject(ERRORS.UNKOWN));
    });
}

OrderController.prototype.updateOrder = function(customerUsername, orderId, description, Category, title) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        var orderToBeUpdated = {};

        if (!_self.validator.validateEmptyOrWhiteSpace(customerUsername)) {
            reject(ERRORS.ORDER.USERNAME_MISSING);
            return;
        }

        if (!_self.validator.validateEmptyOrWhiteSpace(orderId)) {
            reject(ERRORS.ORDER.ORDERID_MISSING);
            return;
        }

        if (_self.validator.validateEmptyOrWhiteSpace(Category) && !_self.validator.findValue(CATEGORIES, Category)) {
            reject(ERRORS.ORDER.INVALID_CATEGORY);
            return;
        }

        if (_self.validator.validateEmptyOrWhiteSpace(Category)) {
            orderToBeUpdated.Category = Category;
        }

        if (_self.validator.validateEmptyOrWhiteSpace(description)) {
            orderToBeUpdated.description = description;
        }

        if (_self.validator.validateEmptyOrWhiteSpace(title)) {
            orderToBeUpdated.title = title;
        }

        orderModel.findOneAndUpdate({
                    customerUsername: customerUsername,
                    _id: orderId,
                    state: ORDER_STATE.ACTIVE
                },
                orderToBeUpdated)
            .then(resolve('Success'))
            .catch((err) => reject(ERRORS.UNKOWN));
    });
}

//for providers and admins===============================================================================
OrderController.prototype.getOrdersInCategory = function(Category) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        if (!_self.validator.validateEmptyOrWhiteSpace(Category) || !_self.validator.findValue(CATEGORIES, Category)) {
            reject(ERRORS.ORDER.INVALID_CATEGORY);
            return;
        }

        orderModel.find({ Category: Category },
                'title _id state')
            .then((result) => resolve(result))
            .catch((err) => reject(ERRORS.UNKOWN));
    });
}

//for admins=============================================================================================
OrderController.prototype.adminDeleteOrder = function(orderId) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        if (!_self.validator.validateEmptyOrWhiteSpace(orderId)) {
            reject(ERRORS.ORDER.ORDERID_MISSING);
            return;
        }

        orderModel.findOneAndRemove({
                _id: orderId,
                state: ORDER_STATE.ACTIVE
            })
            .then(resolve('Success'))
            .catch((err) => reject(ERRORS.UNKOWN));
    });
}

//for all================================================================================================
OrderController.prototype.getOrderDetails = function(orderId, callback) {

    var _self = this;

    return new Promise(function(resolve, reject) {

        if (!_self.validator.validateEmptyOrWhiteSpace(orderId)) {
            reject(ERRORS.ORDER.ORDERID_MISSING);
            return;
        }

        orderModel.findById(orderId)
            .then((result) => resolve(result))
            .catch((err) => reject(ERRORS.UNKOWN));
    });
}

module.exports = OrderController;