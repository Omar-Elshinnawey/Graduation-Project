var order = require('../controllers/order.controller'),
    multer = require('multer'),
    cloudinaryStorage = require('multer-storage-cloudinary'),
    middlewares = require('../middlewares/auth.middlewar');

var orderController = new order();
var multerStorage = multer.memoryStorage();

var parser = multer({ storage: multerStorage });

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
     * @apiParam {File} [image] An image to descripe the order
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
    app.post('/myorders', middlewares.isLoggedinCustomer, parser.single('image'), function(req, res) {

        orderController.createOrder(
                req.user.username,
                req.body.description,
                req.body.Category,
                req.body.title,
                req.file)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));
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
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.get('/myorders', middlewares.isLoggedinCustomer, function(req, res) {

        orderController.getOrdersForCustomer(req.user.username)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));
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
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.delete('/myorders/:orderId', middlewares.isLoggedinCustomer, function(req, res) {

        orderController.deleteOrder(req.user.username,
                req.params.orderId)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));
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
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.put('/myorders', middlewares.isLoggedinCustomer, function(req, res) {

        orderController.updateOrder(
                req.user.username,
                req.body.orderId,
                req.body.description,
                req.body.Category,
                req.body.title)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));
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
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.get('/orders/:Category', middlewares.isLoggedinAdminOrProvider, function(req, res) {

        orderController.getOrdersInCategory(
                req.params.Category)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));

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
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.get('/order/delete/:orderId', middlewares.isLoggedinAdmin, function(req, res) {

        orderController.adminDeleteOrder(req.params.orderId)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));
    });

    //for all=============================================================

    /**
     * @api {get} /order/:orderId Get order details
     * @apiGroup Order
     * @apiDescription
     * Gets details of a specified order
     * @apiParam {String} orderId The order id
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
     * @apiError (Error 500) {String} code The error code
     * @apiError (Error 500) {String} message The error message
     * @apiErrorExample {json} Error
     *  HTTP/1.1 500 Internal Server Error
     *  {
     *      "code": "Order/error code",
     *      "message": "error message" 
     *  }
     */
    app.get('/order/:orderId', middlewares.isLoggedin, function(req, res) {

        orderController.getOrderDetails(req.params.orderId)
            .then((result) => res.send(result))
            .catch((err) => res.status(500).send(err));

    });
}