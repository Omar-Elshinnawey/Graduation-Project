var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PaymentSchema = new Schema({

    orderId: String,
    offerId: String,
    date: Date

});

var Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;