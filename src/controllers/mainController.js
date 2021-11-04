// Call FileSystem module
const fs = require('fs');
// Call Path module
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    // Index
    index: (req, res) => {
        res.render('index', { products });
    },

    // Detail from one product
    detail: (req, res) => {
        res.render('productdetail');
    },
};

module.exports = controller;