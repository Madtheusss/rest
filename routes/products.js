const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({
        message: "Usando GET"
    })
});

router.post('/', (req,res) => {
    res.status(201).send({
        message: "Usando POST"
    })
})

module.exports = router;