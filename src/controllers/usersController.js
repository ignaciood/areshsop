// Call FileSystem module
const fs = require('fs');
// Call Path module
const path = require('path');

// Call result validation errors
const { validationResult } = require('express-validator');
// Call Bcrypt for encrypt passwords
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const usersFilePath = path.join(__dirname, '../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    // Cart
    cart: (req, res) => {
        res.render('users/cart');
    },

    // Login
    login: (req, res) => {
        res.render('users/login');
    },

    // Register
    register: (req, res) => {
        res.render('users/register');
    },

    // Store New User on DataBase
    createUser: async (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            let passCrypt = await bcrypt.hash(req.body.password, 10);

            let newUser = {
                id: uuidv4(),
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email,
                password: passCrypt,
                userImage: req.file.filename,
            }
            console.log(newUser);
            try {
                users.push(newUser);
                fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 4), { encoding: "utf-8" });
                res.redirect('/');
            }
            catch (err) {
                throw new Error('Create New User: Error => ' + err);

            }
        } else {
            res.render('users/register', { errors: errors.array(), old: req.body });
        }


    }
};

module.exports = controller;