var offer = require('../controllers/offer.controller');

var offerController = new offer();

module.exports = function offerRouter(app){

    //CRUD for providers===========================================

    app.post('/myoffers', function(req, res){

        offerController.createOffer(
            req.body.providerUsername,
            req.body.orderId,
            req.body.price,
            req.body.description,
            function(err, result){

                if(err)
                    res.send(err);
                else
                    res.send(result);

            });

    });

    app.get('/myoffers/:providerUsername', function(req, res){

        offerController.getOffersForProvider(
            req.params.providerUsername,
            function(err, result){

                if(err)
                    res.send(err);
                else
                    res.send(result);

            });

    });

    app.delete('/myoffers/:providerUsername/:offerId',function(req, res){

        offerController.deleteOffer(
            req.params.providerUsername,
            req.params.offerId,
            function(err, result){

                if(err)
                    res.send(err);
                else
                    res.send(result);

            });

    });

    app.put('/myoffers',function(req, res){

        offerController.updateOffer(
            req.body.providerUsername,
            req.body.offerId,
            req.body.description,
            req.body.price,
            function(err, result){

                if(err)
                    res.send(err);
                else
                    res.send(result);

            }
        )

    });

    app.put('/myoffers/submit/:offerId/:providerUsername',function(req, res){

        offerController.submitForDelivary(
            req.params.providerUsername,
            req.params.offerId,
            function(err, result){
                if(err)
                    res.send(err);
                else
                    res.send(result);
            });
    });

    //Customers=======================================================

    app.get('/offers/:customerUsername/:orderId', function(req, res){

        offerController.getOffersForOrder(
            req.params.customerUsername,
            req.params.orderId,
            function(err, result){

                if(err)
                    res.send(err);
                else
                    res.send(result);
            }
        )

    });

    app.post('/offers/accept', function(req, res){

        offerController.acceptOffer(req.body.customerUsername, req.body.offerId,
        function(err, result){
            
            if(err)
                res.send(err);
            else
                res.send(result);

        });

    });

    app.post('/offers/rate', function(req, res){

        offerController.rateOffer(
            req.body.customerUsername,
            req.body.offerId,
            req.body.review,
            req.body.rating,
            function(err, result){

                if(err)
                    res.send(err);
                else
                    res.send(result);
                    
            }
        );

    });

    //==================================================================

    app.get('/offer/:offerId', function(req, res){

        offerController.getOfferDetails(
            req.params.offerId,
            function(err, result){

                if(err)
                    res.send(err);
                else
                    res.send(result);
            });
    });

}