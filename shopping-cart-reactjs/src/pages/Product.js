import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import "./product.css";

const BLUE = "#172162";
const LIGHT_GREY = "#6e7484";
const BLACK = "#000000";

const API_BASE_URL = "http://localhost:4000/";
const headers = { headers: { Accept: "application/json" } };

const initialValue = {
    title: "",
    quantity: 0,
    price: 0,
    image: "",
    swatchColor: "",
    swatchTitle: "",
};

const TotalListItem = ({ label, value }) => (
    <div className="row col-lg-12 total-col-12">
        <div className="row col-lg-6 total-col-6">
            <div>{label}</div>
        </div>
        <div className="col-lg-6 justify-content-end total-col-6">
            <div className="totalWrapper">
                <div>${value}</div>
            </div>
        </div>
    </div>
);

export const Products = () => {
    const [, setState] = useState({});
    const [loading, setLoading] = useState(false);
    const [postal, setPostal] = useState();
    const [checkoutProduct, setCheckoutProduct] = useState([]);
    const [show, setShow] = useState(false);
    const [addProduct, setAddProduct] = useState(initialValue);
    const [products, setProducts] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddProduct({
            ...addProduct,
            [name]: value,
        });
    };

    const handleClose = () => {
        setAddProduct(initialValue);
        setShow(false);
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        try {
            setLoading(true);
            let res = await axios.get(`${API_BASE_URL}product`, headers);
            if (res?.data?.status) {
                setProducts(res?.data?.data);
            } else {
                alert("Something Went Wrong");
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    const isValid = () => {
        let errorStatus = true;
        let error = '';
        const { title, quantity, price, image, swatchColor, swatchTitle } = addProduct;
        console.log('parseInt(quantity) > 0', quantity, parseInt(quantity) > 1);
        if (!title) {
            error = 'Please enter title';
            errorStatus = false;
        } else if (quantity == 0 || quantity == "0") {
            error = 'Please enter minimum 1 quantity';
            errorStatus = false;
        } else if (price == 0 || price == "0") {
            error = 'Please enter minimum 1 price';
            errorStatus = false;
        } else if (!image) {
            error = 'Please enter image url';
            errorStatus = false;
        } else if (!swatchTitle) {
            error = 'Please enter swatch title color name';
            errorStatus = false;
        } else if (!swatchColor) {
            error = 'Please select swatch Color';
            errorStatus = false;
        }
        if (!errorStatus) {
            alert(error)
        }
        return errorStatus;
    }

    const addLineItem = async () => {
        try {
            if (isValid()) {
                const data = addProduct;
                if (addProduct?.price) {
                    data["price"] = parseFloat(addProduct.price);
                }
                if (addProduct?.quantity) {
                    data["quantity"] = parseInt(addProduct.quantity);
                }
                setLoading(true);
                let res = await axios.post(`${API_BASE_URL}product`, data, headers);
                if (res?.status) {
                    getProduct();
                    alert("Added product successfully");
                    handleClose();
                } else {
                    alert("Something Went Wrong");
                }
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    const removeLineItem = async (ItemId) => {
        try {
            setLoading(true);
            let res = await axios.delete(`${API_BASE_URL}product/${ItemId}`, headers);
            if (res?.data?.status) {
                getProduct();
                alert("Removed product successfully");
            } else {
                alert("Something Went Wrong");
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    const onCheckoutProduct = async () => {
        try {
            let productIds = [];
            for (let item of products) {
                productIds.push(item?._id);
            }
            let payload = {
                postal: postal,
                estimatedDeliveryDate: "Dec 2 - Dec 15",
                ids: productIds,
            };
            let res = await axios.post(`${API_BASE_URL}product/checkout`, payload, headers);
            if (res?.data?.status) {
                // getCheckoutProduct();
                alert("Submit successfully");
            } else {
                alert("Something Went Wrong");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getCheckoutProduct = async () => {
        try {
            let res = await axios.get(`${API_BASE_URL}product/checkout`, headers);
            if (res?.data?.status) {
                setCheckoutProduct(res?.data?.data);
            } else {
                alert("Something Went Wrong");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const calculateFees = () => {
        const price = products
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2);
        const tax = ((price * 0.13) / 100).toFixed(2);
        const shipping = 15;
        const total = (parseFloat(price) + parseFloat(tax) + shipping).toFixed(2);
        return { price, tax, shipping, total };
    };

    return (
        <main>
            <div className="container" style={{ padding: "20px" }}>
                <section>
                    <div className="banner-innerpage">
                        <div className="container-fluid">
                            <div
                                className="row"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    flexWrap: "wrap",
                                    marginBottom: "50px",
                                }}
                            >
                                <div>
                                    <h1 style={{ color: BLUE }}>Your cart</h1>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        onClick={handleShow}
                                    >
                                        Add Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="spacer">
                        <div className="container-fluid">
                            <div className="col-lg-12">
                                <div className="shop-listing">
                                    {loading && (
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
                                    )}
                                    {products.map((product, index) => (
                                        <div className="row col-lg-12" key={index}>
                                            <div className="row col-lg-6">
                                                <div className="col-lg-4">
                                                    <img
                                                        // src={"http://localhost:4000/" + product.image}
                                                        src={product.image}
                                                        alt="wrapkit"
                                                        className="img-fluid"
                                                        width="300px"
                                                        height="200px"
                                                    />
                                                </div>
                                                <div className="col-lg-8">
                                                    <h6 style={{ color: BLUE }}>{product.title}</h6>
                                                    <div className="row quantity-text">
                                                        <span>{product.quantity}</span>
                                                    </div>
                                                    <div
                                                        className="row"
                                                        style={{
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <div
                                                            className="swatch-title"
                                                            style={{
                                                                backgroundColor: `${product.swatchTitle}`,
                                                            }}
                                                        />
                                                        <span>{product.swatchTitle}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="col-lg-6 justify-content-end cls-price"
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-end",
                                                }}
                                            >
                                                <h5 className="font-medium m-b-30">
                                                    ${product.price} /{" "}
                                                    <del className="text-muted line-through">$5000</del>
                                                </h5>
                                                <p>Estimated Delivery Date: Dec 2 - Dec 15</p>
                                                <span
                                                    onClick={() => removeLineItem(product._id)}
                                                    style={{
                                                        textDecoration: "underline",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    Remove
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    {/* <hr /> */}
                                </div>

                                <hr />
                                <div className="totalContainer">
                                    <TotalListItem
                                        label="SubTotal"
                                        value={calculateFees().price}
                                    />
                                    <TotalListItem
                                        label="Tax(estimated)"
                                        value={calculateFees().tax}
                                    />
                                    <TotalListItem
                                        label="Shipping"
                                        value={
                                            calculateFees().shipping == 0
                                                ? "Free"
                                                : calculateFees().shipping
                                        }
                                    />

                                    <div className="row col-lg-12 total-col-12">
                                        <div className="row col-lg-6 total-col-6">
                                            <h6 style={{ color: BLUE }}>Total</h6>
                                        </div>
                                        <div className="col-lg-6 justify-content-end total-col-6">
                                            <div className="totalWrapper">
                                                <h6 style={{ color: BLUE }}>
                                                    ${calculateFees().total}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row col-lg-12 ">
                                    <div
                                        className="row col-lg-6 get-checkout-btn"
                                        style={{ padding: "20px 0px" }}
                                    >
                                        <button
                                            onClick={(e) => getCheckoutProduct()}
                                            className="btn btn-primary btn-sm"
                                        >
                                            Get checkout List
                                        </button>
                                    </div>
                                    <div className="col-lg-6 justify-content-end get-checkout-btn">
                                        <div className="submit-container">
                                            <Form>
                                                <Form.Group>
                                                    <Form.Control
                                                        value={postal}
                                                        onChange={(e) => setPostal(e.target.value)}
                                                        name="postal"
                                                        placeholder="Enter postal"
                                                    />
                                                </Form.Group>
                                            </Form>
                                            <button
                                                onClick={(e) => onCheckoutProduct()}
                                                className="btn btn-primary btn-sm"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Add Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    value={addProduct.title}
                                    onChange={handleInputChange}
                                    name="title"
                                    placeholder="Enter title"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    value={addProduct.quantity}
                                    onChange={handleInputChange}
                                    type="number"
                                    name="quantity"
                                    placeholder="Enter quantity"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    value={addProduct.price}
                                    onChange={handleInputChange}
                                    type="number"
                                    name="price"
                                    placeholder="Enter price"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Product Image</Form.Label>
                                <Form.Control
                                    value={addProduct.image}
                                    onChange={handleInputChange}
                                    type="url"
                                    name="image"
                                    placeholder="Enter image URL"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Swatch Title</Form.Label>
                                <Form.Control
                                    value={addProduct.swatchTitle}
                                    onChange={handleInputChange}
                                    name="swatchTitle"
                                    placeholder="Enter swatch title"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Swatch Color</Form.Label>
                                <Form.Control
                                    value={addProduct.swatchColor}
                                    onChange={handleInputChange}
                                    type="color"
                                    name="swatchColor"
                                    placeholder="Enter image URL"
                                    required
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" onClick={addLineItem}>
                            Save Product
                        </Button>
                    </Modal.Footer>
                </Modal>
                {
                    checkoutProduct && checkoutProduct?.length > 0 &&
                    <div>
                        <p>{JSON.stringify(checkoutProduct)}</p>
                    </div>
                }
            </div>
        </main>
    );
};
