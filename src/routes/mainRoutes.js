const express = require('express');

const router = express.Router();

const mainController = require('../controllers/mainController');

// Set Routes
// Index Route
router.get('/', mainController.index);

// Product Details Route
router.get('/productDetails', mainController.detail);

// Cart Details Route
router.get('/cart', mainController.cart);

// Login Route
router.get('/login', mainController.login);

// Register Route
router.get('/register', mainController.register);

module.exports = router;