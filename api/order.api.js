
var order = require('../controllers/order.controller');

var orderController = new order();

module.exports = function orderRouter(app) {

    app.post('/orders', function (req, res) {

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

    app.get('/orders/:customerUsername', function (req, res) {

        orderController.getOrders(req.params.customerUsername,
            function (err, result) {
                res.send(result);
            });



    });

    app.delete('/orders/:customerUsername/:orderId', function (req, res) {

        orderController.deleteOrder(req.params.customerUsername,
            req.params.orderId, function (err, result) {

                res.send(result);

            });

    });

    app.put('/orders', function (req, res) {

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

}