const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//Listando todos os pedidos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "SELECT * FROM pedidos",
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                if(result.length == 0) {
                    res.status(414).send({
                        message: "Nenhum pedido encontrado!"
                    });
                };

                const response = {
                    quantidade: result.length,
                    pedido: result.map(ped => {
                        return {
                            id_pedido: ped.id_pedido,
                            id_produto: ped.id_produto,
                            quantidade: ped.quantidade,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os pedidos',
                                url: 'http://localhost:3000/pedidos/' + ped.id_pedido
                            }
                        }
                    })
                }
                res.status(200).send({ response })
            }
        )
    })
});

//Listando apenas o pedido selecionado pelo id
router.get('/:id_pedido', (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) { res.status(500).send({ error: error }) }
        conn.query(
            "SELECT * FROM pedidos WHERE id_pedido = ?",
            [req.params.id_pedido],
            (error, result, field) => {
                if(error){ return res.status(500).send({ error: error })}

                if( result == 0){
                    res.status(404).send({ message: "Pedido não encontrado" })
                }

                const response = {
                    pedido: { 
                        id_pedidos: result[0].id_pedidos,
                        quantidade: result[0].quantidade,
                        request: {
                            tipo: 'GET',
                            descricao: "",
                            url: "http://localhost:3000/pedidos"
                        }
                    }
                }
                return res.status(200).send({ response })
            }
        )
    })
});

//Alterando um pedido
router.patch('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE pedidos SET quantidade = ?
            WHERE id_pedido= ?`,
            [req.body.quantidade, req.body.id_pedido],
            (error, result, field) => {
                if(error){ return res.status(500).send({ error: error }) }

                const response = {
                    pedido: {
                        id_pedido: req.body.id_pedido,
                        quantidade: req.body.quantidade,
                        request: {
                            tipo: "PATCH",
                            descricao: "",
                            url: "http://localhost:3000/pedidos"
                        }
                    }
                }
                return res.status(202).send({ response })
            }
        );
    })
});

//Criando um pedido
router.post('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "INSERT INTO pedidos (id_produto, quantidade) VALUES (?, ?)",
            [req.body.id_produto, req.body.quantidade],
            (error, result, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error })}
                
                const response = {
                    pedidoCriado: {
                        id_pedido: req.body.id_pedido,
                        quantidade: req.body.quantidade,
                        request: {
                            tipo: "POST",
                            descricao: "Pedido criado com Sucesso!",
                            url:"http://localhost:3000/pedidos"
                        }
                    }
                }

                return res.status(201).send({ response })
            }
        );
    });
});

//Deletando um pedido
router.delete('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "DELETE FROM pedidos WHERE id_pedido = ?",
            [req.body.id_pedido],
            (error, result, field) => {
                if(error){ return res.status(500).send({ error: error })}

                const response = {
                    request: {
                        tipo: "DELETE",
                        descricao: "Pedido deletado com sucesso!",
                        url: "http://localhost:3000/pedidos"
                    }
                }

                return res.status(200).send({ response })
            }
        );
    })
});

module.exports = router