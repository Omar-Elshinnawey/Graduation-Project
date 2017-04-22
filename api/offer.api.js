var offer = require('../controllers/offer.controller'),
    REFUND_TYPE = require('../constants/refund.constant');

var offerController = new offer();

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
    app.post('/myoffers', function(req, res) {

        offerController.createOffer(
                req.body.providerUsername,
                req.body.orderId,
                req.body.price,
                req.body.description)
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
    app.get('/myoffers/:providerUsername', function(req, res) {
        offerController.getOffersForProvider(
                req.params.providerUsername)
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
    app.delete('/myoffers/:providerUsername/:offerId', function(req, res) {

        offerController.deleteOffer(
                req.params.providerUsername,
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
    app.put('/myoffers', function(req, res) {

        offerController.updateOffer(
                req.body.providerUsername,
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
    app.put('/myoffers/submit/:offerId/:providerUsername', function(req, res) {

        offerController.submitForDelivary(
                req.params.providerUsername,
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
    app.get('/offers/:customerUsername/:orderId', function(req, res) {

        offerController.getOffersForOrder(
                req.params.customerUsername,
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
    app.post('/offers/accept', function(req, res) {
        offerController.acceptOffer(
                req.body.customerUsername,
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
    app.post('/offers/rate', function(req, res) {

        offerController.rateOffer(
                req.body.customerUsername,
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
    app.post('/offers/refund', function(req, res) {
        offerController.requestRefund(
                req.body.customerUsername,
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
    app.post('/offers/defect', function(req, res) {
        offerController.requestRefund(
                req.body.customerUsername,
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
    app.get('/offers/:orderId', function(req, res) {

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
    app.get('/offer/delete/:offerId', function(req, res) {

        offerController.adminDeleteOffer(req.params.offerId)
            .then((resule) => res.send(resule))
            .catch((err) => res.status(500).send(err));
    });

    app.get('/refunds', function(req, res) {
        offerController.getRefundRequests()
            .then((resule) => res.send(resule))
            .catch((err) => res.status(500).send(err));
    });

    app.post('/refunds/:refundId/:newState', function(req, res) {

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
     *  }]
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
    app.get('/offer/:offerId', function(req, res) {

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
    app.get('/top/:category', function(req, res) {

        offerController.getTopProviders(req.params.category)
            .then((resule) => res.send(resule))
            .catch((err) => res.status(500).send(err));
    });
}