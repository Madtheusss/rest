const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");

//Definindo as rotas
const productRoute = require('./routes/products');
const pedidosRoute = require ('./routes/pedidos');

app.use(morgan('dev')); //retorno de valores no console
app.use(bodyParser.urlencoded ({ extended: false })) // Apenas dados simples 
app.use(bodyParser.json()); //Acentando apenas json no body

//CORS
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*') //Aceitando todos os servidores de acesso
    res.header( //Propriedades de cabeçalho
        'Access-Control-Allow-Header',
        'Origin','X-Requested-With','Content-Type','Accept','Authorization'
    ); 
    //Definindo os metodos que podem ser retornados
    if(req.method === ' OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

//Chamando as rotas
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