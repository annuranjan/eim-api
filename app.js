const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/route');
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(morgan("dev"));

mongoose.connect("mongodb://localhost:27017/eim").then(() => {
    console.log("Successfully connected to the db...");
}).catch(err => {
    console.log("Error in connection: " + err);
});

app.use('/', routes);

// app.use((req, res, next) => {
//     const error = new Error("Not Found!");
//     res.status = 404;
//     next(error);
// });

// app.use((error, req, res, next) => {
//     // res.status(error.status || 500).json(error);
//     res.status(500).json(error);
// })

module.exports = app;