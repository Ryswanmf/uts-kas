// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Set port
const PORT = process.env.PORT || 8000;

// Use middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Mengirimkan file HTML
  });

// Include transaction routes
require('./routes/transaction.routes.js')(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});