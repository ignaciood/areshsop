const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');

const path = require("path");

// Call Multer for image storage module
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/img/products/cover"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

const upload = multer({ storage: storage });

// Set Routes
// Product Details Route
router.get('/', productsController.list);

// Product Create Route
router.get('/create', productsController.create);

// Product Catch Data from Create Form Route
router.post('/store', upload.single('image'), productsController.store);

// Product Details Route
router.get('/:id', productsController.detail);



module.exports = router;