const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');

// create express app
const app = express();
const PORT = 6174;

app.use(express.json());

// enable cors
app.use(cors())

// enable file upload
app.use(fileUpload())

// connect to the database
// configuring the database
const dbConfig = require('./config/mysql.config.js');

var connection = mysql.createConnection(dbConfig);
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
});


// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to the application. Express JS is outputting this JSON. " });
});


// Require routes
require('./app/routes/routes.js')(app);




app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server is listening on PORT", PORT);
});