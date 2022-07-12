const express = require("express");
const router = express.Router();
const mysql = require('../mysql').pool;

// Listando todos os produtos 
router.get('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "SELECT * FROM produtos",
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                res.status(200).send({ response: resultado })
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
            (error, resultado, fields) => {
                if (error) {
                    return res.status(500).send({ error: error })
                } else {
                    res.status(200).send({ response: resultado })
                }
            }
        )
    })
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
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error })
                } else {
                    res.status(202).send({ message: "Produto alterado com sucesso" })
                }
            }
        )
    });
});

//Criando um novo produto
router.post('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "INSERT INTO produtos (nome, preco) VALUES (?,?)",
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release(); // Importante liberar a conexão dessa forma
                if (error) {
                    return res.status(500).send({ error: error })
                } else {
                    res.status(200).send({ response: resultado })
                }
            }
        )
    });
});

//Deletando um produto 
router.delete('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "DELETE FROM produtos WHERE id_produto = ?", [req.body.id_produto],
            (error, resultado, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                res.status(200).send({ response: resultado })
            }
        )
    })
});

module.exports = router;