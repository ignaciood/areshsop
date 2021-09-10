const express = require('express');

const router = express.Router();

// Set Routes
router.get('/', (req, res) => {
    res.render('index');
})

router.get('/productdetails', (req, res) => {
    res.render('productdetails');
})

router.get('/cart', (req, res) => {
    res.render('cart');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

module.exports = router;