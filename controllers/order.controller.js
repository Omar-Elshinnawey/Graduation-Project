var orderModel = require('../models/order.model');
var ORDER_STATE = require('../models/order-state.model');
var CATEGORIES = require('../models/category.model');
var ERRORS = require('../models/error.model');
var Validator = require('../controllers/validator.controller');

module.exports = class OrderController {

    constructor (){
        this.validator = new Validator();
    }

    createOrder(customerUsername, description, Category, title, callback){

        if(!this.validator.validateEmptyOrWhiteSpace(customerUsername)){

            callback(ERRORS.ORDER.USERNAME_MISSING, 'error');
            return;

        }

        if(!this.validator.validateEmptyOrWhiteSpace(description)){

            callback(ERRORS.ORDER.DESCRIPTION_MISSING, 'error');
            return;

        }

        if(!this.validator.validateEmptyOrWhiteSpace(title)){

            callback(ERRORS.ORDER.TITLE_MISSING, 'error');
            return;
            
        }

        if(!Category || !this.validator.findValue(CATEGORIES, Category)){

            callback(ERRORS.ORDER.INVALID_CATEGORY, 'error');
            return;
            
        }
        

        var order = orderModel({

            customerUsername: customerUsername,
            description: description,
            Category: Category,
            title: title,
            state: ORDER_STATE.ACTIVE

        });

         order.save( function(err){
            
            if(err)
                callback(err, 'fail');
            else
                callback(null,'Success');
            
        });
    }

    getOrders(customerUsername, callback){

        if(!this.validator.validateEmptyOrWhiteSpace(customerUsername)){
            callback(ERRORS.ORDER.USERNAME_MISSING, 'error');
            return;
        }

        orderModel.find({ customerUsername: customerUsername }, 
        
        function(err, result){

            if(err)
               callback(err, 'error');
            else
                callback(null, result);

        });

    }

    deleteOrder(customerUsername, orderId, callback){

        if(!this.validator.validateEmptyOrWhiteSpace(customerUsername)){
            callback(ERRORS.ORDER.USERNAME_MISSING, 'error');
            return;
        }

        if(!this.validator.validateEmptyOrWhiteSpace(orderId)){
            callback(ERRORS.ORDER.ORDERID_MISSING, 'error');
            return;
        }

        orderModel.findOneAndRemove(
            {
                _id: orderId,
                customerUsername: customerUsername
            }, 
            function(err){

                if(err)
                    callback(err,'fail');
                else
                    callback(null, 'deleted');      
        });
    }

    updateOrder(customerUsername, orderId, description, Category, title, callback){

        var orderToBeUpdated = {};

        if(!this.validator.validateEmptyOrWhiteSpace(customerUsername)){
            callback(ERRORS.ORDER.USERNAME_MISSING, 'error');
            return;
        }

        if(!this.validator.validateEmptyOrWhiteSpace(orderId)){
            callback(ERRORS.ORDER.ORDERID_MISSING, 'error');
            return;
        }

        if(Category && !this.validator.findValue(CATEGORIES, Category)){
            callback(ERRORS.ORDER.INVALID_CATEGORY, 'error');
            return;
        }

        if(Category){
            orderToBeUpdated.Category = Category;
        }

        if(this.validator.validateEmptyOrWhiteSpace(description)){
            orderToBeUpdated.description = description;
        }

        if(this.validator.validateEmptyOrWhiteSpace(title)){
            orderToBeUpdated.title = title;
        }

        orderModel.findOneAndUpdate(
            {
                customerUsername: customerUsername,
                _id: orderId
            },
            orderToBeUpdated
            ,
            function(err, result){

                if(err)
                    callback(err, 'failed');
                else
                    callback(null, 'updated');

            });

    }
}