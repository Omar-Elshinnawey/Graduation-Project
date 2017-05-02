var offer = require('../controllers/offer.controller'),
    delivery = require('../controllers/delivery.controller'),
    REFUND_TYPE = require('../constants/refund.constant'),
    middlewares = require('../middlewares/auth.middlewar'),
    multer = require('multer');

var offerController = new offer();
var deliveryController = new delivery();
var multerStorage = multer.memoryStorage();

var parser = multer({ storage: multerStorage });

module.exports = function offerRouter(app) {

    //for providers===========================================

    /**
     * @api {post} /myoffers Create offer
     * @apiGroup My offers
     * @apiDescription
     * Creates a new offer for a specific order
     * @apiParam {String} orderId id of the order
     * @apiParam {Number} price The price of the offer
     * @apiParam {String} description The offer description
     * @apiParam {File} image An image to descripe the offer
     * @apiSuccess {String} Success
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  'Success'
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.post('/myoffers', middlewares.isLoggedinProviderNotBanned, parser.single('image'), function(req, res) {

        offerController.createOffer(
                req.user.username,
                req.body.orderId,
                req.body.price,
                req.body.description,
                req.file)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));
    });

    /**
     * @api {get} /myoffers Get offers for provider
     * @apiGroup My offers
     * @apiDescription
     * Gets offers for the currenlty logged in provider
     * @apiSuccess {String} offers._id offer ID
     * @apiSuccess {String} offers.providerUsername The username of provider who created the offer
     * @apiSuccess {Number} offers.price The price of the offer 
     * @apiSuccess {Object([])} offers.orderId
     * @apiSuccess {String} offers.orderId.title The order title
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  [
     *      {
     *          "_id": "offer id",
     *          "providerUsername": "name of provider",
     *          "orderId":[{
     *              "title": "order title"
     *           }]
     *          "price": 100
     *      }
     *  ]
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.get('/myoffers', middlewares.isLoggedinProvider, function(req, res) {
        offerController.getOffersForProvider(
                req.user.username)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));
    });

    /**
     * @api {delete} /myoffers/:offerId Delete offer
     * @apiGroup My offers
     * @apiDescription
     * Delete an offer for the currently logged in provider
     * @apiParam {String} offerId The offer ID
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  'Success'
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.delete('/myoffers/:offerId', middlewares.isLoggedinProviderNotBanned, function(req, res) {

        offerController.deleteOffer(
                req.user.username,
                req.params.offerId)
            .then((result) => res.send(res))
            .catch((err) => res.status(500).send(err));

    });

    /**
     * @api {put} /myoffers Update offer
     * @apiGroup My offers
     * @apiDescription
     * Update an offer for the currently logged in provider
     * @apiParam {String} offerId The offer ID
     * @apiParam {String} [description] Description of the offer
     * @apiParam {Number} [price] The price of the offer
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  'Success'
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.put('/myoffers', middlewares.isLoggedinProviderNotBanned, function(req, res) {

        offerController.updateOffer(
                req.user.username,
                req.body.offerId,
                req.body.description,
                req.body.price)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));

    });

    /**
     * @api {put} /myoffers/submit/:offerId Submit for delivery
     * @apiGroup My offers
     * @apiDescription
     * Submits an offer for delivery
     * @apiParam {String} offerId The offer ID
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  'Success'
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.put('/myoffers/submit/:offerId', middlewares.isLoggedinProviderNotBanned, function(req, res) {

        offerController.submitForDelivary(
                req.user.username,
                req.params.offerId)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));
    });

    //Customers=======================================================

    /**
     * @api {get} /offers/:orderId Get offers for an order
     * @apiGroup Offers
     * @apiDescription
     * Gets offers for a specific order
     * @apiSuccess {String} offers._id offer ID
     * @apiSuccess {String} offers.providerUsername The username of provider who created the offer
     * @apiSuccess {Number} offers.price The price of the offer 
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  [
     *      {
     *          "_id": "offer id",
     *          "providerUsername": "name of provider",
     *          "price": 100
     *      }
     *  ]
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.get('/offers/:orderId', middlewares.isLoggedinCustomer, function(req, res) {

        offerController.getOffersForOrder(
                req.user.username,
                req.params.orderId)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));

    });

    /**
     * @api {post} /offers/accept Accept offer
     * @apiGroup Offers
     * @apiDescription
     * Accept a specific offer
     * @apiParam {String} offerId id of the offer
     * @apiParam {json} payment The payment object containing payment information
     * @apiParam {String} payment.emonth Expiry month of the credit card
     * @apiParam {String} payment.eyear Expiry year of the credit card
     * @apiParam {String} payment.cvc CVC 'Security number' on the back of card
     * @apiParam {String} payment.number Credit card number
     * @apiParam {String} [payment.name] Name on the card
     * @apiSuccess {String} Success
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  'Success'
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.post('/offers/accept', middlewares.isLoggedinCustomerNotBanned, function(req, res) {
        offerController.acceptOffer(
                req.user.username,
                req.body.offerId,
                req.body.payment)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));

    });

    /**
     * @api {post} /offers/rate Rate offer
     * @apiGroup Offers
     * @apiDescription
     * Rate a specific offer
     * @apiParam {String} offerId id of the offer
     * @apiParam {String} review review of the offer
     * @apiParam {Number{1-5}} rating of the offer 
     * @apiSuccess {String} Success
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  'Success'
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.post('/offers/rate', middlewares.isLoggedinCustomerNotBanned, function(req, res) {

        offerController.rateOffer(
                req.user.username,
                req.body.offerId,
                req.body.review,
                req.body.rating)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));
    });

    /**
     * @api {post} /offers/refund Request refund
     * @apiGroup Offers
     * @apiDescription
     * Request a refund for a delivered offer
     * @apiParam {String} offerId id of the offer
     * @apiParam {String} reason reason of the refund 
     * @apiSuccess {String} Success
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  'Success'
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.post('/offers/refund', middlewares.isLoggedinCustomerNotBanned, function(req, res) {
        offerController.requestRefund(
                req.user.username,
                req.body.offerId,
                REFUND_TYPE.REFUND,
                req.body.reason)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));
    });

    /**
     * @api {post} /offers/defect Report a defect
     * @apiGroup Offers
     * @apiDescription
     * Report a defect and creates a refund request
     * @apiParam {String} offerId id of the offer
     * @apiParam {String} reason reason of the refund 
     * @apiSuccess {String} Success
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  'Success'
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.post('/offers/defect', middlewares.isLoggedinCustomerNotBanned, function(req, res) {
        offerController.requestRefund(
                req.user.username,
                req.body.offerId,
                REFUND_TYPE.DEFECT,
                req.body.reason)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));
    });

    //for admins===============================================================

    /**
     * @api {get} /offers/:orderId Get offers for order
     * @apiGroup Admin functions
     * @apiDescription
     * Administrator gets offers for an order
     * @apiParam {String} orderId The order ID
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  'Success'
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.get('/offers/:orderId', middlewares.isLoggedinAdmin, function(req, res) {

        offerController.adminGetOffersForOrder(req.params.orderId)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));
    });

    /**
     * @api {get} /offer/delete/:offerId Delete offer
     * @apiGroup Admin functions
     * @apiDescription
     * Administrator deletes an offer
     * @apiParam {String} offerId The offer ID
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  'Success'
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.get('/offer/delete/:offerId', middlewares.isLoggedinAdmin, function(req, res) {

        offerController.adminDeleteOffer(req.params.offerId)
            .then((resule) => res.send(resule))
            .catch((err) => res.status(500).send(err));
    });

    /**
     * @api {get} /refunds Get refund requests
     * @apiGroup Admin functions
     * @apiDescription
     * Administrator gets all refund requests
     * @apiSuccess {Object([])} refunds
     * @apiSuccess {String} refunds._id The id of the request
     * @apiSuccess {String} refunds.date The date in which the request was submitted
     * @apiSuccess {number=0,1} refund.type The type of the request 0 means normal refund 1 means refund of defect
     * @apiSuccess {number=0,1,2} refund.state The state of the request 0 means active, 1 means accepted and 2 means denied
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  [{
     *      "_id": "request_id",
     *      "date": "5/2/2017",
     *      "type": 1,
     *      "state": 0
     *  }]
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.get('/refunds', middlewares.isLoggedinAdmin, function(req, res) {
        offerController.getRefundRequests()
            .then((resule) => res.send(resule))
            .catch((err) => res.status(500).send(err));
    });

    /**
     * @api {post} /refunds/:refundId/:newState Accept or reject a refund
     * @apiGroup Admin functions
     * @apiDescription
     * Admin accepts or denies a refund request
     * @apiParam {String} refundId id of the refund request
     * @apiParam {Number} newState 1 to accept refund other values to deny
     * @apiSuccess {String} Success
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  'Success'
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.post('/refunds/:refundId/:newState', middlewares.isLoggedinAdmin, function(req, res) {

        if (req.params.newState === 1)
            offerController.acceptRefund(req.params.refundId)
            .then((resule) => res.send(resule))
            .catch((err) => res.status(500).send(err));
        else
            offerController.rejectRefund(req.params.refundId)
            .then((resule) => res.send(resule))
            .catch((err) => res.status(500).send(err));
    });

    //for all==================================================================

    /**
     * @api {get} /offer/:offerId Get offer details
     * @apiGroup Offer
     * @apiDescription
     * Gets details of a specified offer
     * @apiParam {String} offerId The offer id
     * @apiSuccess {String} _id The offer id
     * @apiSuccess {String} providerUsername The name of the provider who created the offer
     * @apiSuccess {number=0,1,2,3,4} state The offer's state
     * @apiSuccess {String} description The offer discription
     * @apiSuccess {String} rating The rating of the offer. Could be null
     * @apiSuccess {String} review The review of the offer. Could be null
     * @apiSuccess {String} price The offer price 
     * @apiSuccess {Object([])} orderId The order details
     * @apiSuccess {String} orderId._id The order ID
     * @apiSuccess {String} orderId.customerUsername The name of the customer who created the order
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     * {
     *  "_id": "58e8a3545b12b723a838ecab",
     *  "providerUsername": "abdo",
     *  "price": 10,
     *  "description": "test offer1",
     *  "state": 0,
     * "orderId": [
     *  {
     *      "_id": "58e8a28d99ebb8337c9a0abf",
     *      "customerUsername": "test"
     *  }],
     *  "picture": "picture url"
     * }
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.get('/offer/:offerId', middlewares.isLoggedin, function(req, res) {

        offerController.getOfferDetails(req.params.offerId)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));
    });

    /**
     * @api {get} /top/:category Get top five providers
     * @apiGroup General
     * @apiDescription
     * Get top five providers in a category
     * @apiParam {number=0,1,2,3,4} Category The category of the order
     * @apiSuccess {String} _id The name of provider
     * @apiSuccess {Number} total The average rating of the provider
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  [{ "_id": "name1" "total": 3.55},
     *   { "_id": "name2" "total": 2.55}]
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.get('/top/:category', middlewares.isLoggedin, function(req, res) {

        offerController.getTopProviders(req.params.category)
            .then((resule) => res.send(resule))
            .catch((err) => res.status(500).send(err));
    });

    //for delivery============================================================

    /**
     * @api {put} /delivery/:offerId Report offer delivery
     * @apiGroup Delivery
     * @apiDescription
     * Report that an offer has been delivered
     * @apiParam {String} offerId The offer ID
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  'Success'
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.put('/delivery/:offerId', middlewares.isLoggedinDelivery, function(req, res) {
        deliveryController.updateState(req.params.offerId)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));
    });

    /**
     * @api {get} /delivery Get deliveries
     * @apiGroup Delivery
     * @apiDescription
     * Get all deliveries
     * @apiSuccess {Object([])} deliveries
     * @apiSuccess {String} deliveries._id The delivery id
     * @apiSuccess {String} deliveries.fromAddress The provider address
     * @apiSuccess {String} deliveries.toAddress The customer address
     * @apiSuccess {String} deliveries.expectedDate The date in which the delivery is expected to be delivered
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  [{
     *      "_id": "delivery_id"
     *      "fromAddress": "provider address",
     *      "toAddress": "customer address",
     *      "expectedDate": "5/20/2017"
     *  }]
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.get('/delivery', middlewares.isLoggedinDelivery, function(req, res) {
        deliveryController.getDeliveries()
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));
    });

    /**
     * @api {get} /delivery/:orderId Get delivery date
     * @apiGroup Delivery
     * @apiDescription
     * Get delivery expected date
     * @apiSuccess {String} _id The delivery id
     * @apiSuccess {String} expectedDate The date in which the delivery is expected to be delivered
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  {
     *      "_id": "delivery_id"
     *      "expectedDate": "5/20/2017"
     *  }
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.get('/delivery/:orderId', middlewares.isLoggedinCustomer, function(req, res) {

        deliveryController.getDeliveryDate(req.params.deliveryId, req.user.username)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));
    });
}