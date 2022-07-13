const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//Listando todos os pedidos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "SELECT * FROM pedidos",
            (error, resultado, fields) => {
                if (error) {
                    return res.status(500).send({ error: error })
                } else {
                    res.status(200).send({
                        response: resultado,
                        message: "Listagem de pedido feita!"
                    });
                }
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
            (error, resultado, field) => {
                if (error) {
                    res.status(500).send({ error: error });
                } else {
                    res.status(200).send({
                        response: resultado,
                        message: "Listagem de pedido feita!"
                    });
                }
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
            (error, resultado, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                } else {
                    res.status(201).send({
                        response: resultado,
                        message: "Pedido Alterado com Sucesso!"
                    });
                }
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
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error })
                } else {
                    res.status(200).send({
                        response: resultado,
                        message: "Pedido Criado com Sucesso!"
                    });
                }
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
            (error, resultado, field) => {
                if (error) {
                    res.status(500).send({ error: error })
                } else {
                    res.status(201).send({
                        response: resultado,
                        message: "Pedido deletado com sucesso!"
                    });
                }
            }
        );
    })
});

module.exports = router