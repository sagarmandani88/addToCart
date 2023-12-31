const productRepository = require('./repository')

exports.createProduct = async (req, res) => {
    try {
        let payload = {
            title: req.body.title,
            price: req.body.price,
            // image: req.file.path,
            image: req.body.image,
            quantity: req.body.quantity,
            swatchColor: req.body.swatchColor,
            swatchTitle: req.body.swatchTitle
        }
        let product = await productRepository.createProduct({
            ...payload
        });
        res.status(200).json({
            status: true,
            data: product,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}

exports.getProducts = async (req, res) => {
    try {
        let products = await productRepository.products();
        res.status(200).json({
            status: true,
            data: products,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}

exports.getProductById = async (req, res) => {
    try {
        let id = req.params.id
        let productDetails = await productRepository.productById(id);
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}

exports.removeProduct = async (req, res) => {
    try {
        let id = req.params.id
        let productDetails = await productRepository.removeProduct(id)
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}

exports.checkoutProduct = async (req, res) => {
    try {
        let payload = {
            postal: req.body.postal,
            estimatedDeliveryDate: req.body.estimatedDeliveryDate,
            ids: req.body.ids,
        }
        let productCheckout = await productRepository.checkoutProduct(payload);
        res.status(200).json({
            status: true,
            data: productCheckout,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}

exports.getCheckoutProducts = async (req, res) => {
    try {
        let products = await productRepository.checkoutProducts();
        res.status(200).json({
            status: true,
            data: products,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}