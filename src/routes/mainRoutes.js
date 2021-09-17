const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');

// Set Routes
router.get('/', productsController.index);

router.get('/productdetails', (req, res) => {
    res.render('products/productdetails');
})

router.get('/cart', (req, res) => {
    res.render('users/cart');
})

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.get('/register', (req, res) => {
    res.render('users/register');
})

module.exports = router;