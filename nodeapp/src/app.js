// app.js
// This is the entry point of the application

// modules
const express = require('express');
const connectDB = require('./config/db.js');
const route = require('./routes/router');
var cors = require('cors');

// Setup express
const app = express();

//Use router.js
route(app);

// Connect our DB
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

//init middleware
app.use(express.json({ extended: false }));

//Testing
app.get('/', (req, res) => res.send('Hello world!'));

// Port to run on
const port = process.env.PORT || 8082;

// Instructs express to listen on that port
app.listen(port, () => console.log(`Server running on port ${port}`));