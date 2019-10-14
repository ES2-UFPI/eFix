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
const create = router.post('/', (req, res, next) => {
    console.log("Requisicao de POST de Servico recebida.");

    const id_prestador = req.body.id_prestador;
    const id_servico = req.body.id_servico;
    const categoria = req.body.categoria;
    const nome = req.body.nome;
    const preco = req.body.preco;
    const descricao = req.body.descricao;

    const refPath = "servico/" + id_servico;
    const ref = firebase.database().ref(refPath)

    ref.update({ id_prestador, id_servico, categoria, nome, preco, descricao }, function(error) {
        if (error) {
            res.send("Dados não poderam ser salvos " + error);
        } else {
            res.send("Dados salvos com sucesso " + 200);
        }
    });
});

// recupera servicos
const read_all = router.get('/', (req, res, next) => {
    console.log("Reqisicao GET all recebida.");
    const ref = firebase.database().ref("/servico/");

    ref.on(
        "value", function(snapshot){
            res.json(snapshot.val())
            ref.off("value")
        },
        function(errorObject){
            console.log("Leitura falhou: " + errorObject.code);
            res.send(errorObject.code);
        }
    );    
});

// recupera um servico em especifico
const show = router.get('/id/:id', (req, res, next) => {
    const id = req.params.id;
    console.log("Reqisicao GET pelo serviço " + id);

    const ref = firebase.database().ref("/servico").orderByChild("id_servico").equalTo(id);

    ref.on(
        "value", function(snapshot){
            res.json(snapshot.val())
            ref.off("value")
        },
        function(errorObject){
            console.log("Leitura falhou: " + errorObject.code);
            res.send(errorObject.code);
        }
    );    
})

// recupera todos os servicos de uma categoria
const read_categ = router.get('/categ/:categ', (req, res, next) => {
    const categ = req.params.categ;
    console.log("Reqisicao Pedido pela categoria " + categ);

    const ref = firebase.database().ref("/servico").orderByChild("categoria").equalTo(categ);

    ref.on(
        "value", function(snapshot){
            res.json(snapshot.val())
            ref.off("value")
        },
        function(errorObject){
            console.log("Leitura falhou: " + errorObject.code);
            res.send(errorObject.code);
        }
    );    
})

app.use('/servico', read_all);
app.use('/servico', create);
app.use('/servico', show);
app.use('/servico', read_categ)

module.exports = app;