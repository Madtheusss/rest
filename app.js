const express = require('express');
const app = express();
const morgan = require('morgan');

const productRoute = require('./routes/products');
const pedidosRoute = require ('./routes/pedidos');

app.use(morgan('dev')); //retorno de valores no console

app.use('/products', productRoute);
app.use('/pedidos', pedidosRoute );

//Tratamento de erro para caso não encontrar nenhuma rota
app.use((req,res,next) => {
    const erro = new Error("Não encontrado");
    erro.status = 404;
    next(erro);
});

app.use((error, req,res,next) =>{
    res.status(error.status || 500);
    return res.send({
        erro: {
            message: error.message
        }
    });
});

module.exports = app;