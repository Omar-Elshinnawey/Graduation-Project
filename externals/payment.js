const simplify = require('simplify-commerce'),
    paymentClient = require('../config/simplify-commerce.config'),
    Promise = require('bluebird');

Payment = {
    makePayment: function(paymentObject) {
        return new Promise(function(resolve, reject) {

            paymentClient.payment.create({
                amount: paymentObject.amount,
                card: {
                    expMonth: paymentObject.emonth,
                    expYear: paymentObject.eyear,
                    cvc: paymentObject.cvc,
                    number: paymentObject.number,
                    name: paymentObject.name
                },
            }, function(err, data) {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
}


module.exports = Payment;