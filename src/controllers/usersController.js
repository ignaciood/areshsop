// Call FileSystem module
const fs = require('fs');
// Call Path module
const path = require('path');

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
    }
};

module.exports = controller;