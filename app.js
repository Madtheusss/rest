const express = require('express');
const app = express();


const productRoute = require('./routes/products');

app.use('/products', productRoute);
module.exports = app;