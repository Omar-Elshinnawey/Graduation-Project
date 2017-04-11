var order = require('../controllers/order.controller');

var orderController = new order();

module.exports = function orderRouter(app) {

    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/apidoc/index.html');
    });

    //for customers===========================================

    /**
     * @api {post} /myorders Create order
     * @apiGroup My orders
     * @apiDescription
     * Creates a new order for the currently logged in customer
     * @apiParam {String} description Description of the order
     * @apiParam {number=0,1,2,3,4} Category The category of the order
     * @apiParam {String} title The title of the order
     * @apiSuccess {String} Success
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  'Success'
     * @apiError {String} code The error code
     * @apiError {String} message The error message
     * @apiErrorExample {json} Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.post('/myorders', function(req, res) {

        orderController.createOrder(
                req.body.customerUsername,
                req.body.description,
                req.body.Category,
                req.body.title)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));
    });

    /**
     * @api {get} /myorders get orders
     * @apiGroup My orders
     * @apiDescription
     * Gets orders for the currently logged in customers
     * @apiSuccess {String} orders._id The order id
     * @apiSuccess {String} orders.title The order's title
     * @apiSuccess {number=0,1} orders.state The order's state
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  [{
     *      "_id": "12355",
     *      "title": "order title",
     *      "state": 1
     * }]
     */
    app.get('/myorders/:customerUsername', function(req, res) {

        orderController.getOrdersForCustomer(req.params.customerUsername)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));
    });

    /**
     * @api {delete} /myorders/:orderId Delete order
     * @apiGroup My orders
     * @apiDescription
     * Delete an order for the currently logged in customer
     * @apiParam {String} orderId The order ID
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  'Success'
     */
    app.delete('/myorders/:customerUsername/:orderId', function(req, res) {

        orderController.deleteOrder(req.params.customerUsername,
                req.params.orderId)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));
    });

    /**
     * @api {put} /myorders Update order
     * @apiGroup My orders
     * @apiDescription
     * Update an order for the currently logged in customers
     * @apiParam {String} orderId The order ID
     * @apiParam {String} [description] Description of the order
     * @apiParam {number=0,1,2,3,4} [Category] The category of the order
     * @apiParam {String} [title] The title of the order
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  'Success'
     */
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

    /**
     * @api {get} /orders/:Category Get orders in a category
     * @apiGroup Orders
     * @apiDescription
     * Gets orders in a specified category
     * @apiParam {number=0,1,2,3,4} Category The category of the order
     * @apiSuccess {String} orders._id The order id
     * @apiSuccess {String} orders.title The order's title
     * @apiSuccess {number=0,1} orders.state The order's state
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  [{
     *      "_id": "12355",
     *      "title": "order title",
     *      "state": 1
     * }]
     */
    app.get('/orders/:Category', function(req, res) {

        orderController.getOrdersInCategory(
                req.params.Category)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));

    });

    //for admins==========================================================

    /**
     * @api {get} /order/delete/:orderId Delete order
     * @apiGroup Admin functions
     * @apiDescription
     * Administrator deletes an order
     * @apiParam {String} orderId The order ID
     * @apiSuccessExample {String} Success
     *  HTTP/1.1 200 OK
     *  'Success'
     */
    app.get('/order/delete/:orderId', function(req, res) {

        orderController.adminDeleteOrder(req.params.orderId)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));
    });

    //for all=============================================================

    /**
     * @api {get} /orders/:Category Get orders in a category
     * @apiGroup Orders
     * @apiDescription
     * Gets details of a specified order
     * @apiParam {String} _id The order id
     * @apiSuccess {String} _id The order id
     * @apiSuccess {String} title The order's title
     * @apiSuccess {number=0,1} state The order's state
     * @apiSuccess {String} description The order discription
     * @apiSuccess {number=0,1,2,3,4} Category The category of the order
     * 
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  {
     *      "_id": "12355",
     *      "title": "order title",
     *      "state": 1,
     *      "Category": 2,
     *      "description": "order description"
     * }
     */
    app.get('/order/:orderId', function(req, res) {

        orderController.getOrderDetails(req.params.orderId)
            .then((result) => res.send(result))
            .catch((err) => res.send(err));

    });
}