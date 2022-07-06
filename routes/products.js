const express = require("express");
const router = express.Router();

// Listando todos os produtos 
router.get('/', (req, res) => {
    res.status(200).send({
        message: "Usando GET dentro da rota de produtos"
    })
});

//Listando apenas o produto escolhido por id
router.get('/:id_produto', (req,res) => {
    const id = req.params.id_produto
    if( id === 'especial' ){
        res.status(200).send({
            message: "Fazendo Get do produto pelo index do mesmo",
            id: id // Mostrando o id digitado no console
        });
    }else{
        res.status(200).send({
            message: "Você passou um ID",
            id: id // Mostrando o id digitado no console
        });
    }
});

//Fazendo alteração em um produto
router.patch('/', (req,res) => {
    res.status(201).send({
        message: "Fazendo o Patch na rota de produtos",
    })
});

//Criando um novo produto
router.post('/', (req,res) => {
    res.status(201).send({
        message: "Usando POST dentro da rota de produtos"
    })
});

//Deletando um produto 
router.delete('/', (req,res) =>{
    res.status(201).send({
        message:"Realizando o delete no produto"
    })
});

module.exports = router;