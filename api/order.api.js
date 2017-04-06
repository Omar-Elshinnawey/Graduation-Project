var order = require('../controllers/order.controller');

var orderController = new order();

module.exports = function orderRouter(app) {

    //CRUD for customers===========================================

    app.post('/myorders', function(req, res) {

        orderController.createOrder(
                req.body.customerUsername,
                req.body.description,
                req.body.Category,
                req.body.title)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));
    });

    app.get('/myorders/:customerUsername', function(req, res) {

        orderController.getOrdersForCustomer(req.params.customerUsername)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));
    });

    app.delete('/myorders/:customerUsername/:orderId', function(req, res) {

        orderController.deleteOrder(req.params.customerUsername,
                req.params.orderId)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));
    });

    app.put('/myorders', function(req, res) {

        orderController.updateOrder(
                req.body.customerUsername,
                req.body.orderId,
                req.body.description,
                req.body.Category,
                req.body.title)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));
    });

    //providers====================================================

    app.get('/orders/:Category', function(req, res) {

        orderController.getOrdersInCategory(
                req.params.Category)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));

    });

    //=============================================================

    app.get('/order/:orderId', function(req, res) {

        orderController.getOrderDetails(req.params.orderId)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));

    });
}