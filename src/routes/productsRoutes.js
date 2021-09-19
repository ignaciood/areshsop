const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');

// Set Routes
// Product Details Route
router.get('/', productsController.list);



module.exports = router;