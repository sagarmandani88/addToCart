const router = require("express").Router();
const productController = require("./controller");
const multerInstance = require('./multer')

// router.post("/", multerInstance.upload.single('image'), productController.createProduct);
router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.post("/checkout", productController.checkoutProduct);
router.get("/checkout", productController.getCheckoutProducts);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.removeProduct);

module.exports = router;