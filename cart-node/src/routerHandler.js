const productRoutes = require("./routes");

module.exports = app => {
    app.use("/product", productRoutes);
}