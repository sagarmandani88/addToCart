const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    swatchColor: {
        type: String,
        required: true,
    },
    swatchTitle: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema);