'use strict';

const util = require('../../util.js');
const express = require('express');

firebase.initializeApp(util);

const app = express();
const router = express.Router();

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "eFix API rodando",
        version: "0.0.1"
    });
});

// Cria servico
const create = router.post('/', (req, res, next) => {
    console.log("Requisicao de POST de Servico recebida.");
    const tipo = req.body.tipo;
    const nome = req.body.nome;
    const preco = req.body.preco;
    const descricao = req.body.descricao;

    const refPath = tipo + "/" + nome;
    const ref = firebase.database().ref(refPath)

    ref.update({ valor }, function(error) {
        if (error) {
            res.send("Dados não poderam ser salvos " + error);
        } else {
            res.send("Dados salvos com sucesso " + 200);
        }
    });
});


app.use('/', route);

module.exports = app;