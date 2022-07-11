const express = require('express');
const router = express.Router();

//Listando todos os pedidos
router.get('/', (req, res, next) => {
    return res.status(200).send({message: "Retornando todos os pedidos"})
});

//Listando apenas o pedido selecionado pelo id
router.get('/:id_pedido', (req,res) => {
    const id = req.params.id_pedidos;
    
    if (id === "especial"){
        res.status(200).send({ 
            message:"Retornando pedido com id especial",
            id_pedido:id,
        });
    }else {
        res.status(200).send({
            message:"Retornando pedido",
            id:id,
        });
    }
});

//Alterando um pedido
router.patch('/', (req,res) => {
   res.status(201).send({
    message: "Alterando o pedido",
   });
});

//Criando um pedido
router.post('/', (req,res) => {

    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    };
    res.status(201).send({
        message: "Insere o pedido",
        pedidoCriado: pedido
    })
});

//Deletando um pedido
router.delete('/', (req,res) => {
    res.status(201).send({
        message:"Deletando o pedido"
    });
});

module.exports = router