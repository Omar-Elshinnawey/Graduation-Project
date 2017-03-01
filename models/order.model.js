var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new Schema({

    customerUsername: String,
    description: String,
    state: Number,
    /*picture, */
    Category: Number,
    title: String

});

var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;