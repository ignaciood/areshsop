// Call Express Validator module
const { check } = require('express-validator');
// Call Path module
const path = require('path');

const validateRegister = [
    check('name')
        .notEmpty().withMessage('Completa tu nombre')
        .isLength({ min: 3 }).withMessage('Tu nombre debe contener minimo 3 letras'),

    check('nickname')
        .notEmpty().withMessage('Completa tu nickname')
        .isLength({ min: 3 }).withMessage('Tu nickname debe contener minimo 3 letras'),

    check('email')
        .notEmpty().withMessage('Completa tu email')
        .isEmail().withMessage('Debes ingresar un email valido'),

    check('password')
        .notEmpty().withMessage('Completa tu password')
        .isLength({ min: 8 }).withMessage('La password debe contener minimo 8 caracteres')

    /*body('userimage')
        .custom((value, { req }) => {
            let imageFile = req.file;
            let extensions = ['.jpg', '.png'];

            if (!imageFile) {
                throw new Error('Sube una imagen');
            } else {
                let extensionFile = path.extname(file.originalname);

                if (!extensions.includes(extensionFile)) {
                    throw new Error('Las extensiones permitidas son ' + extensions.join(', '));
                }
            }
            return true;
        })*/
]

module.exports = validateRegister;