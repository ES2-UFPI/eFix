'use strict'

const util = require('../../util.js');
const express = require('express');
const firebase = require('firebase');
const bodyParser = require('body-parser');

firebase.initializeApp(util);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));

const router = express.Router();

// Cria servico
const create = router.post('/servico', (req, res, next) => {
    console.log("Requisicao de POST de Servico recebida.");
    const categoria = req.body.categoria;
    const nome = req.body.nome;
    const preco = req.body.preco;
    const descricao = req.body.descricao;

    const refPath = "servico/" + categoria + '/' + nome;
    const ref = firebase.database().ref(refPath)

    ref.update({ tipo, nome, preco, descricao }, function(error) {
        if (error) {
            res.send("Dados não poderam ser salvos " + error);
        } else {
            res.send("Dados salvos com sucesso " + 200);
        }
    });
});


app.use('/', create);

module.exports = app;