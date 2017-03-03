const orderModel = require('../models/order.model');

const ORDER_STATE = require('../constants/order-state.constant');
const CATEGORIES = require('../constants/category.constant');
const ERRORS = require('../constants/error.constant');

const Validator = require('../controllers/validator.controller');

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

        if(!this.validator.validateEmptyOrWhiteSpace(Category) || !this.validator.findValue(CATEGORIES, Category)){

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

    // this is for customers to view thier own orders.
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

    //this is for customers to delete thier own orders.
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
                customerUsername: customerUsername,
                state: ORDER_STATE.ACTIVE
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

        if(this.validator.validateEmptyOrWhiteSpace(Category) && !this.validator.findValue(CATEGORIES, Category)){
            callback(ERRORS.ORDER.INVALID_CATEGORY, 'error');
            return;
        }

        if(this.validator.validateEmptyOrWhiteSpace(Category)){
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
                _id: orderId,
                state: ORDER_STATE.ACTIVE
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

    //this is for providers to get orders in a specific category
    getOrdersInCategory(Category, callback){

        if(!this.validator.validateEmptyOrWhiteSpace(Category) || !this.validator.findValue(CATEGORIES, Category)){

            callback(ERRORS.ORDER.INVALID_CATEGORY);
            return;

        }

        orderModel.find(
            {
                Category: Category
            },

            function(err, result){
                if(err)
                    callback(err, 'error');
                else
                    callback(null, result);
            }
        )
    }

}