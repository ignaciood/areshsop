const express = require('express');

const router = express.Router();
// Call Users controller
const usersController = require('../controllers/usersController');
// Call Validator for Register form
const validateRegister = require('../middleware/registerValidator');

const uploadAvatar = require('../middleware/multer');

// Cart Details Route
router.get('/cart', usersController.cart);

// Login Route
router.get('/login', usersController.login);

// Register Route
router.get('/register', usersController.register);

router.post('/createuser', uploadAvatar.single('userimage'), validateRegister, usersController.createUser);

module.exports = router;