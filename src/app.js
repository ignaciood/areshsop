// Call express module
const express = require('express');
// Call path module
const path = require('path');
// Call express session module
const session = require('express-session');
//Call cookies
const cookies = require('cookie-parser');
// Call middleware to check if there a users allready logged
const userLoggedMiddleware = require('./middleware/userLoggedMiddleware');

// Call routes
const mainRouter = require('./routes/mainRoutes');
const productsRouter = require('./routes/productsRoutes');
const usersRouter = require('./routes/usersRoutes');

// Call override method
const methodOverride = require('method-override');

// Build a express app
const app = express();

// Create PORT variable with process.env
const PORT = process.env.PORT || 3000;

// Set public folder
const staticFolder = path.resolve(__dirname, './public');

// Set View Engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// Set app to use public folder
app.use(express.static(staticFolder));

// Set app to use encoded
app.use(express.urlencoded({ extended: false }));

// Set app to use json pharse
app.use(express.json());

// Set app to override method on form
app.use(methodOverride('_method')); // method="POST" on form to use PUT y DELETE

// Set app to use express session
app.use(session({
    secret: 'A la grande le puse cuca',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));

app.use(cookies());
app.use(userLoggedMiddleware);

// Use Routes

// Main Routes
app.use('/', mainRouter);
// Users Routers
app.use('/', usersRouter);
// Products Routers for Admins
app.use('/products', productsRouter);
// 404 Routes
app.use((req, res, next) => {
    res.status(404).render('404-not-found');
});

// Config listening port
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})
