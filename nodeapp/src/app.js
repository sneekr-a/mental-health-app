// app.js
// This is the entry point of the application

// modules
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.js');
const route = require('./routes/router');
var cors = require('cors');

// Setup express
const app = express();

// Specify Body parser
app.use(bodyParser.json());
// cors
app.use(cors({ origin: true, credentials: true }));

//Use router.js
route(app);

// Connect our DB
connectDB();

//Testing
app.get('/', (req, res) => res.send('Hello world!'));

// Port to run on
const port = process.env.PORT || 8082;

// Instructs express to listen on that port
app.listen(port, () => console.log(`Server running on port ${port}`));