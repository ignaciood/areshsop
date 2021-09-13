const express = require('express');

const router = express.Router();

// Set Routes
router.get('/', (req, res) => {
    res.render('index');
})

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