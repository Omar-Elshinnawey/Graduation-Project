var offer = require('../controllers/offer.controller'),
    REFUND_TYPE = require('../constants/refund.constant');

var offerController = new offer();

module.exports = function offerRouter(app) {

    //CRUD for providers===========================================

    app.post('/myoffers', function(req, res) {

        offerController.createOffer(
                req.body.providerUsername,
                req.body.orderId,
                req.body.price,
                req.body.description)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));
    });

    app.get('/myoffers/:providerUsername', function(req, res) {

        offerController.getOffersForProvider(
                req.params.providerUsername)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));
    });

    app.delete('/myoffers/:providerUsername/:offerId', function(req, res) {

        offerController.deleteOffer(
                req.params.providerUsername,
                req.params.offerId)
            .then((result) => res.send(res))
            .catch((err) => res.send(err));

    });

    app.put('/myoffers', function(req, res) {

        offerController.updateOffer(
                req.body.providerUsername,
                req.body.offerId,
                req.body.description,
                req.body.price)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));

    });

    app.put('/myoffers/submit/:offerId/:providerUsername', function(req, res) {

        offerController.submitForDelivary(
                req.params.providerUsername,
                req.params.offerId)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));
    });

    app.get('/myoffers/rating/:offerId/:providerUsername', function(req, res) {
        offerController.getRating(
                req.params.providerUsername,
                req.params.offerId)
            .then((rating) => res.send(rating))
            .catch((err) => res.send(err));
    });

    //Customers=======================================================

    app.get('/offers/:customerUsername/:orderId', function(req, res) {

        offerController.getOffersForOrder(
                req.params.customerUsername,
                req.params.orderId)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));

    });

    app.post('/offers/accept', function(req, res) {
        offerController.acceptOffer(
                req.body.customerUsername,
                req.body.offerId,
                req.body.payment)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));

    });

    app.post('/offers/rate', function(req, res) {

        offerController.rateOffer(
                req.body.customerUsername,
                req.body.offerId,
                req.body.review,
                req.body.rating)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));
    });

    app.post('/offers/refund', function(req, res) {
        offerController.requestRefund(
                req.body.customerUsername,
                req.body.offerId,
                REFUND_TYPE.REFUND,
                req.body.reason)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));
    });

    app.post('/offers/defect', function(req, res) {
        offerController.requestRefund(
                req.body.customerUsername,
                req.body.offerId,
                REFUND_TYPE.DEFECT,
                req.body.reason)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));
    });

    //==================================================================

    app.get('/offer/:offerId', function(req, res) {

        offerController.getOfferDetails(req.params.offerId)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));
    });
}