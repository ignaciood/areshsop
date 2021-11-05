// Call FileSystem module
const fs = require('fs');
// Call Path module
const path = require('path');
// Call Id generation module
const shortid = require('shortid')


const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    // Root - Show all products
    list: (req, res) => {
        res.render('products/productsList', { products });
    },

    // Detail - Detail from one product
    detail: (req, res) => {
        const imgProductById = products.find(element => element.id === req.params.id);
        res.render('products/productsDetail', { product: imgProductById });
    },

    // Create - Form to create
    create: (req, res) => {
        res.render('products/productsCreate');
    },

    // Create Method to store in DataBase
    store: (req, res) => {
        // Product Database Schema and catch data from create product form
        const newProduct = {
            id: shortid.generate(),
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
        const id = req.params.id;
        const imgProductById = products.findIndex((item) => item.id === id);
        const { name, description, category, rating, platform, price, } = req.body;

        products[imgProductById] = {
            id: id,
            name: name,
            description: description,
            image: req.file.filename,
            category: category,
            rating: rating,
            platform: platform,
            price: price
        };
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 4), { encoding: "utf-8" });
        res.render('products/productsList', { products });
    },
    // Update - Method to update
    getEdit: (req, res) => {
        const id = req.params.id;
        const imgProductById = products.find((item) => item.id === id);
        res.render('products/productsEdit', { products: imgProductById });

    },

    // Delete - Delete one product from DB
    delete: (req, res) => {
        const id = req.params.id;
        const newProducts = products.filter((item) => item.id != id);


        fs.writeFileSync(
            path.join(__dirname, '../database/products.json'),
            JSON.stringify(newProducts, null, 4),
            {
                encoding: "utf8",
            }
        );;


        res.render('products/productsList', { products: newProducts });
    }
};


module.exports = controller;