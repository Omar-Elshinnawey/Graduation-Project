const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var deliverySchema = new Schema({

    orderId: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    offerId: [{ type: Schema.Types.ObjectId, ref: 'Offer' }],
    fromAddress: String,
    toAddress: String,
    expectedDate: Date
});

module.exports = mongoose.model('Delivery', deliverySchema);