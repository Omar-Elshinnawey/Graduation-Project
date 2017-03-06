
var order = require('../controllers/order.controller');

var orderController = new order();

module.exports = function orderRouter(app) {

    //CRUD for customers===========================================

    app.post('/myorders', function (req, res) {

        orderController.createOrder(
            req.body.customerUsername,
            req.body.description,
            req.body.Category,
            req.body.title,
            function (err, result) {
                if(err)
                    res.send(err);
                else
                    res.send(result);

            }
        );
    });

    app.get('/myorders/:customerUsername', function (req, res) {

        orderController.getOrdersForCustomer(req.params.customerUsername,
            function (err, result) {
                if(err)
                    res.send(err);
                else
                    res.send(result);
            });



    });

    app.delete('/myorders/:customerUsername/:orderId', function (req, res) {

        orderController.deleteOrder(req.params.customerUsername,
            req.params.orderId, function (err, result) {

                res.send(result);

            });

    });

    app.put('/myorders', function (req, res) {

        orderController.updateOrder(
            req.body.customerUsername,
            req.body.orderId,
            req.body.description,
            req.body.Category,
            req.body.title,
            function (err, result) {

                if (err)
                    res.send(err);
                else
                    res.send(result);

            });

    });

    //providers====================================================

    app.get('/orders/:Category', function(req, res){

        orderController.getOrdersInCategory(
            req.params.Category, 
            function(err, result){

                if(err)
                    res.send(err);
                else
                    res.send(result);
            });

    });

    //=============================================================

    app.get('/order/:orderId', function(req, res){

        orderController.getOrderDetails(
            req.params.orderId,
            function(err, result){

                if(err)
                    res.send(err);
                else
                    res.send(result);
            });

    });

}