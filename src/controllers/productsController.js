// Call FileSystem module
const fs = require('fs');
// Call Path module
const path = require('path');
// Call Id generation module
const { uuid } = require('uuidv4');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    // Root - Show all products
    list: (req, res) => {
        res.render('products/productsList', { products });
    },

    // Detail - Detail from one product
    detail: (req, res) => {
        const detailProductById = products.find(element => element.id === req.params.id);
        res.render('products/productsDetail', { product: detailProductById });
    },

    // Create - Form to create
    create: (req, res) => {
        res.render('products/productsCreate');
    },

    // Create Method to store in DataBase
    store: (req, res) => {
        // Product Database Schema and catch data from create product form
        const newProduct = {
            id: uuid(),
            name: req.body.name,
            description: req.body.description,
            image: req.file.filename,
            category: req.body.category,
            rating: req.body.rating,
            platform: req.body.platform,
            price: req.body.price
        };
        // Add new Product to the array JSON DataBase
        products.push(newProduct);
        // Write JSON DataBase file
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 4), { encoding: "utf-8" });
        // Render created Product by ID
        res.render('products/productsDetail', { product: newProduct });
    },

    // Update - Form to edit
    edit: (req, res) => {
        // Do the magic
    },
    // Update - Method to update
    update: (req, res) => {
        // Do the magic
    },

    // Delete - Delete one product from DB
    destroy: (req, res) => {
        // Do the magic
    }
};

module.exports = controller;