const express = require('express');
const app = express();

const productRoute = require('./routes/products');
const pedidosRoute = require ('./routes/pedidos');

app.use('/products', productRoute);
app.use('/pedidos', pedidosRoute )
module.exports = app;