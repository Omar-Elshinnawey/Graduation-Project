var offer = require('../controllers/offer.controller');

var offerController = new offer();

module.exports = function offerRouter(app){

    app.post('/offers', function(req, res){

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

    app.delete('/offers/:providerUsername/:offerId',function(req, res){

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

    app.put('/offers',function(req, res){

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

}