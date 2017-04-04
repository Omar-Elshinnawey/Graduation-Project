const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var refundSchema = new Schema({
    offerId: [{ type: Schema.Types.ObjectId, ref: 'Offer' }],
    date: Date,
    reason: String,
    type: Number
});

var Refund = mongoose.model('Refund', refundSchema);

module.exports = Refund;