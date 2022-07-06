const express = require('express');
const router = express.Router();

//Listando todos os pedidos
router.get('/', (req, res, next) => {
    return res.status(200).send({message: "Usando GET dentro da rota de pedidoso"})
});

//Listando apenas o pedido selecionado pelo id
router.get('/:id_pedidos', (req,res) => {
    const id = req.params.id_pedidos;
    
    if (id === "especial"){
        res.status(200).send({ 
            message:"pedidos com id especial",
            id:id,
        });
    }else {
        res.status(200).send({
            message:"Trazendo o pedidoso escolhido pelo index",
            id:id,
        });
    }
});

//Alterando um pedido
router.patch('/', (req,res) => {
   res.status(201).send({
    message: "Usando o patch dentro da rota do pedidos",
   });
});

//Criando um pedido
router.post('/', (req,res) => {
    return res.status(201).send({message: "Usando POST dentro da rota de pedidos"})
});

//Deletando um pedido
router.delete('/', (req,res) => {
    res.status(201).send({
        message:"Fazendo um Delete na rota de pedidos"
    });
});

module.exports = router