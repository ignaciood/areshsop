const express = require('express');

const router = express.Router();

const mainController = require('../controllers/mainController');

// Set Routes
// Index Route
router.get('/', mainController.index);

// Product Details Route
router.get('/productDetails', mainController.detail);

module.exports = router;