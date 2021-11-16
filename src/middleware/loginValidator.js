// Call Express Validator module
const { check } = require('express-validator');
// Call FileSystem module
const fs = require('fs');
// Call Path module
const path = require('path');

const usersFilePath = path.join(__dirname, '../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const validateLogin = [
    check('email')
        .notEmpty().withMessage('Completa tu email')
        .isEmail().withMessage('Debes ingresar un email valido'),
       
    check('password')
        .notEmpty().withMessage('Completa tu password')
        .isLength({ min: 8 }).withMessage('La password debe contener minimo 8 caracteres'),

]

module.exports = validateLogin;