const Product = require('../models/product');

const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

const createProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;

    const product = new Product({
        name,
        description,
        price,
        stock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

const updateProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.description = description;
        product.price = price;
        product.stock = stock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
