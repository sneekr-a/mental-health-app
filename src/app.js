// app.js
// This is the entry point of the application

// modules
const express = require('express');
const connectDB = require('./config/db.js');

// Setup express
const app = express();

// Connect our DB
connectDB();

// Testing
app.get('/', (req, res) => res.send('Hello world!'));

// Port to run on
const port = process.env.PORT || 8082;

// Instructs express to listen on that port
app.listen(port, () => console.log(`Server running on port ${port}`));