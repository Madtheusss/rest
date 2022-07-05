const express = require ('express');

const app = express();

app.listen(3000, (req,res) => {
    console.log('Servidor funcionando na porta 3000');
})

app.get("/", (req,res) => {
    return res.json({message: "Tudo certinho "})
})