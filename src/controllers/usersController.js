// Call FileSystem module
const fs = require('fs');
// Call Path module
const path = require('path');

// Call result validation errors
const { validationResult } = require('express-validator');
// Call Bcrypt for encrypt passwords
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
//Call models

const usersFilePath = path.join(__dirname, '../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    // Cart
    cart: (req, res) => {
        res.render('users/cart');
    },

    // Register render register form
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
                req.session.userLogged = newUser.email;
                res.redirect('/');
            }
            catch (err) {
                throw new Error('Create New User: Error => ' + err);

            }
        } else {
            res.render('users/register', { errors: errors.mapped(), old: req.body });
        }


    },
     // Login render login form
     login: (req, res) => {
        res.render('user/login');
    },
    loginProcess: (req, res) => {
		let userToLogin = users.find(user => user.email == req.body.email);
        
		if(userToLogin) {
			let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user == "on") {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 200 })
				}

				return res.redirect('/profile');
			} 
			return res.render('users/login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('users/login', {
			errors: {
				email: {
					msg: 'Las credenciales son inválidas'
				}
			}
		});
	},
    profile: (req, res) => {
		return res.render('userProfile', {
			user: req.session.userLogged
		});
        
	},

    // Log out user and destroy the session information
        logout: (req, res) => {
            res.clearCookie('userEmail');
            req.session.destroy();
            return res.redirect('/login');
        }
};

 module.exports = controller; 
