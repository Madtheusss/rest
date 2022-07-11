const express = require("express");
const router = express.Router();

// Listando todos os produtos 
router.get('/', (req, res) => {
    res.status(200).send({
        message: "Retornando todos os produtos",
    });
});

//Listando apenas o produto escolhido por id
router.get('/:id_produto', (req,res) => {
    const id = req.params.id_produto
    if( id === 'especial' ){
        res.status(200).send({
            message: "Retornando apenas um produto",
            id: id // Mostrando o id digitado no console
        });
    }else{
        res.status(200).send({
            message: "Retornando o produto com id especial",
            id: id // Mostrando o id digitado no console
        });
    }
});

//Fazendo alteração em um produto
router.patch('/', (req,res) => {
    res.status(201).send({
        message: "Alterando o produto",
    })
});

//Criando um novo produto
router.post('/', (req,res) => {

    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    };

    res.status(201).send({
        message: "Criando um novo produto",
        produtoCriado: produto
    })
});

//Deletando um produto 
router.delete('/', (req,res) =>{
    res.status(201).send({
        message:"Deletando o produto"
    })
});

module.exports = router;