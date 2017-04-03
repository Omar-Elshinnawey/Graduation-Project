const simplify = require('simplify-commerce'),
    paymentClient = require('../config/simplify-commerce.config');

Payment = {
    makePayment: function(paymentObject, callback) {

        paymentClient.payment.create({
                amount: paymentObject.amount,
                card: {
                    expMonth: paymentObject.emonth,
                    expYear: paymentObject.eyear,
                    cvc: paymentObject.cvc,
                    number: paymentObject.number,
                    name: paymentObject.name
                },
            },
            function(err, data) {
                callback(err, data);
            });
    }
}


module.exports = Payment;