const express = require("express");
const router = express.Router();
const mysql = require('../mysql').pool;

// Listando todos os produtos 
router.get('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "SELECT * FROM produtos",
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                if(result.length == 0){
                    return res.status(404).send({
                        message: "Nenhum produto cadastrado!"
                    })
                };

                const response = {
                    quantidade: result.length,
                    produto: result.map(prod => {
                        return {
                            id_produto: prod.id_produto,
                            nome: prod.nome,
                            preco: prod.preco,
                            request: {
                                tipo: 'GET',
                                descricao: "Retorna os detalhes de um produto específico",
                                url: 'http://localhost:3000/produtos/' + prod.id_produto
                            }
                        }
                    })
                }
                return res.status(200).send({ response });
            }
        )
    })
});


//Listando apenas o produto escolhido por id
router.get('/:id_produto', (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "SELECT * FROM produtos WHERE id_produto = ?",
            [req.params.id_produto],
            (error, result, fields) => {
                if (error) { res.status(500).send({ error: error }) }

                if(result.length == 0){
                    return res.status(404).send({
                        message: "Nenhum Produto com esse ID cadastrado!"
                    });
                };
                
                const response = { 
                    produto: { 
                        id_produto: result[0].id_produto,
                        nome: result[0].nome,
                        preco: result[0].preco,
                        request: {
                            tipo: "GET",
                            descricao: "Retornando todos os produto",
                            url:"http://localhost:3000/produtos"
                        }
                    }
                }

                return res.status(200).send({ response: result });
            }
        )
    });
});

//Fazendo alteração em um produto
router.patch('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE produtos SET nome = ?,
                                 preco = ? 
                      WHERE id_produto = ?`,
            [
                req.body.nome,
                req.body.preco,
                req.body.id_produto
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }

                if( req.body.id_produto <= 0){
                    return res.status(404).end({
                        message: "Nenhum produto cadastrado com esse ID"
                    });
                }
                const response = {
                    produtoAtualizado: {
                        id_produto: req.body.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {
                            tipo: "POST",
                            descricao: "Retorna os detalhes do produto específico",
                            url: "http://localhost:3000/produtos/" + req.body.id_produto
                        }
                    }
                }
               return res.status(202).send({ response })
            }
        );
    });
});

//Criando um novo produto
router.post('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "INSERT INTO produtos (nome, preco) VALUES (?,?)",
            [req.body.nome, req.body.preco],
            (error, result, field) => {
                conn.release(); // Importante liberar a conexão dessa forma
                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    produtoCriado: {
                        id_produto: req.body.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {
                            tipo: "POST",
                            descricao: "Produto criado com sucesso!",
                            url: "http://localhost:3000/produtos"
                        }
                    }
                }
                return res.status(201).send({ response })
            });
        }
    );
});

//Deletando um produto 
router.delete('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "DELETE FROM produtos WHERE id_produto = ?", [req.body.id_produto],
            (error, result, field) => {
                if(error) { return res.status(500).send({ error: error })}

                if(result.length == 0){
                    return res.status(404).send({
                        message: "Nenhum produto cadastrado com esse ID"
                    });
                };

                const response = {
                        request: {
                            tipo: "DELETE",
                            descricao: "Produto Deletado com Sucesso!",
                            url: "http://localhost:3000/produtos"
                    }
                }
                return res.status(200).send({ response }) 
            }
        );
    });
});



module.exports = router;