const Product = require("./productModel");
const Checkout = require("./checkoutProductModel");

exports.products = async () => {
    const products = await Product.find();
    return products;
};

exports.productById = async (id) => {
    const product = await Product.findById(id);
    return product;
};

exports.createProduct = async (payload) => {
    const newProduct = await Product.create(payload);
    return newProduct
};

exports.removeProduct = async (id) => {
    const product = await Product.findByIdAndRemove(id);
    return product
};

exports.checkoutProducts = async () => {
    const checkoutProducts = await Checkout.find();
    return checkoutProducts;
};

exports.checkoutProduct = async (payload) => {
    const checkoutProduct = await Checkout.create(payload);
    return checkoutProduct
};