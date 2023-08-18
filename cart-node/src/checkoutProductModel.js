const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
let checkoutProductSchema = new Schema({
    postal: {
        type: String,
        required: true,
    },
    estimatedDeliveryDate: {
        type: String,
        required: true,
    },
    ids: {
        type: [ String ],
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Checkout', checkoutProductSchema);