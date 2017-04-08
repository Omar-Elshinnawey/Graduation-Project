var order = require('../controllers/order.controller');

var orderController = new order();

module.exports = function orderRouter(app) {

    //for customers===========================================

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

    //for providers and admins============================================

    app.get('/orders/:Category', function(req, res) {

        orderController.getOrdersInCategory(
                req.params.Category)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));

    });

    //for admins==========================================================
    //get request for the browser support but it should be delete.
    app.get('/order/delete/:orderId', function(req, res) {

        orderController.adminDeleteOrder(req.params.orderId)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));
    });

    //for all=============================================================

    app.get('/order/:orderId', function(req, res) {

        orderController.getOrderDetails(req.params.orderId)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));

    });
}