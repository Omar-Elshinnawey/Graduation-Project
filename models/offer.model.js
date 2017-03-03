var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OfferSchema = new Schema({

    orderId: String,
    providerUsername: String,
    price: Number,
    //picture,
    description: String,
    state: Number,
    rating: Number,
    review:String
});

var Offer = mongoose.model('Offer', OfferSchema);

module.exports = Offer;