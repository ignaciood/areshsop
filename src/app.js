// Call express module
const express = require('express');

// Call path module
const path = require('path');

// Call routes
const router = require('./routes/routes');

// Build a express app
const app = express();

// Create PORT variable with process.env
const PORT = process.env.PORT || 3000;

// Set public folder
const staticFolder = path.resolve(__dirname, './public');

// Set app to use public folder
app.use(express.static(staticFolder));

// Set View Engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// Use Routes
app.use('/', router);

// Config listening port
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})

