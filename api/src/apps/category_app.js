'use strict'

const express = require('express');
const firebase = require('../firebase_init');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const category_app = express();
category_app.use(bodyParser.json());
category_app.use(bodyParser.urlencoded({extend: false}));

const router = express.Router();

////////// CATEGORIA ///////////
// recupera categorias
const read_category = router.get('/list', (req, res, next) => {
    console.log("Reqisicao GET categorias recebida.");
    const ref = firebase.database().ref("/categoria/");

    ref.on(
        "value", function(snapshot){
            const data = [];
            snapshot.forEach(function(childSnapshot){
                data.push(childSnapshot.val())
            });
                 
            const json = {"categorias" : data};

            res.json(json);
            ref.off("value")
        },
        function(errorObject){
            console.log("Leitura falhou: " + errorObject.code);
            res.send(errorObject.code);
        }
    );    
});

const create_category = router.post('/new', (req, res, next) => {
    console.log("Requisicao de POST de categoria recebida.");

    const id = req.body.id;
    const nome = req.body.nome;

    const refPath = "categoria/" + id;
    const ref = firebase.database().ref(refPath)

    ref.update({ id, nome }, function(error) {
        if (error) {
            res.send("Dados não poderam ser salvos " + error);
        } else {
            res.send("Dados salvos com sucesso " + 200);
        }
    });
});

const update_category = router.put('/att', (req, res, next) => {
    const id = req.body.id;
    const nome = req.body.nome;
    console.log("Update para " + id + " recebido. Novo nome: " + nome);

    const refPath = "/categoria/" + id + "/";
    const ref = firebase.database().ref(refPath);

    ref.update({ nome }, function(error) {
        if(error){
            res.send("Falha na atualização " + error);
        } else {
            res.send("Atualizado com sucesso " + 200);
        }
    });
});

const delete_category = router.delete('/del', (req, res, next) => {
    const id = req.body.id;
    const refPath = "/categoria/" + id + "/";

    console.log("DLETE request " + id + " received.")
    
    const ref = firebase.database().ref(refPath);

    ref.remove(function(error) {
        if(error){
            res.send("Falha ao deletar " + error);
        } else {
            res.send("Deletado com sucesso " + 200);
        }
    })
})

category_app.use('/', read_category);
category_app.use('/', create_category);
category_app.use('/', update_category);
category_app.use('/', delete_category);

module.exports = category_app;