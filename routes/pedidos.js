const express = require('express');
const router = express.Router();

//Listando todos os pedidos
router.get('/', (req, res, next) => {
    return res.status(200).send({message: "Retornando todos os pedidos"})
});

//Listando apenas o pedido selecionado pelo id
router.get('/:id_pedidos', (req,res) => {
    const id = req.params.id_pedidos;
    
    if (id === "especial"){
        res.status(200).send({ 
            message:"Retornando pedido com id especial",
            id:id,
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
    return res.status(201).send({message: "Criando o pedido"})
});

//Deletando um pedido
router.delete('/', (req,res) => {
    res.status(201).send({
        message:"Deletando o pedido"
    });
});

module.exports = router