// Call express module
const express = require('express');

// Call path module
const path = require('path');

// Build a express app
const app = express();

// Create PORT variable with process.env
const PORT = process.env.PORT || 3000;

// Set public folder
const staticFolder = path.resolve(__dirname, './public');

// Set app to use public folder
app.use(express.static(staticFolder));

// Set Routes
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
})

app.get('/productdetails', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productdetails.html'));
})

app.get('/pd', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/pd.html'));
})

// Config listening port
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})

