// Call Express Validator module
const { check } = require('express-validator');
// Call FileSystem module
const fs = require('fs');
// Call Path module
const path = require('path');

const usersFilePath = path.join(__dirname, '../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const validateRegister = [
    check('name')
        .notEmpty().withMessage('Completa tu nombre')
        .isLength({ min: 3 }).withMessage('Tu nombre debe contener minimo 3 letras'),

    check('nickname')
        .notEmpty().withMessage('Completa tu nickname')
        .isLength({ min: 3 }).withMessage('Tu nickname debe contener minimo 3 letras')
        .custom((value) => {
            const nicknameUsed = users.find(user => user.nickname === value);

            if (nicknameUsed) {
                throw new Error('Prueba con otro nickname');
            }

            return true;
        }),

    check('email')
        .notEmpty().withMessage('Completa tu email')
        .isEmail().withMessage('Debes ingresar un email valido')
        .custom((value) => {
            const emailUsed = users.find(user => user.email === value);

            if (emailUsed) {
                throw new Error('Prueba con otro email');
            }

            return true;
        }),
    check('password')
        .notEmpty().withMessage('Completa tu password')
        .isLength({ min: 8 }).withMessage('La password debe contener minimo 8 caracteres'),

    check('userimage')
        .custom((value, { req }) => {
            let imageFile = req.file;
            let extensions = ['.jpg', '.png'];

            if (!imageFile) {
                throw new Error('Sube una imagen');
            } else {
                let extensionFile = path.extname(req.file.originalname);

                if (!extensions.includes(extensionFile)) {
                    throw new Error('Las extensiones permitidas son ' + extensions.join(', '));
                }
            }
            return true;
        })
]

module.exports = validateRegister;