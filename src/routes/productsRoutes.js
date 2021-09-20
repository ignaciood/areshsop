const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');

// Set Routes
// Product Details Route
router.get('/', productsController.list);

// Product Details Route
router.get('/:id', productsController.detail);

// Product Create Route
router.get('/create', productsController.create);

// Product Catch Data from Create Form Route
router.post('/store', productsController.store);

module.exports = router;