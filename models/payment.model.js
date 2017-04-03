const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PaymentSchema = new Schema({

    orderId: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    offerId: [{ type: Schema.Types.ObjectId, ref: 'Offer' }],
    date: Date,
    paymentId: String

});

var Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;