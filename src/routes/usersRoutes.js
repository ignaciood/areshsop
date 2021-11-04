const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');

// Cart Details Route
router.get('/cart', usersController.cart);

// Login Route
router.get('/login', usersController.login);

// Register Route
router.get('/register', usersController.register);

module.exports = router;