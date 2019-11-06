'use strict'

const express = require('express');
const firebase = require('../firebase_init');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const user_app = express();
user_app.use(bodyParser.json());
user_app.use(bodyParser.urlencoded({extend: false}));

const router = express.Router();

// cria um usuario no banco de dados
const create = router.post('/', (req, res, next) => {

    const id = crypto.randomBytes(32).toString('hex');
    const nome = req.body.nome;
    const senha = req.body.senha;
    const email = req.body.email;
    const endereco = req.body.endereco;

    const refPath = "usuario/" + id;
    const ref = firebase.database().ref(refPath)

    ref.update({ id, nome, senha, email, endereco,}, function(error) {
        if (error) {
            res.send("Dados não poderam ser salvos " + error);
        } else {
            res.send("Dados salvos com sucesso " + 200);
        }
    });
});

// recupera todos os usuarios
const read = router.get('/', (req, res, next) => {
    const ref = firebase.database().ref("/usuario/");

    ref.on(
        "value", function(snapshot){
            const data = [];
            snapshot.forEach(function(childSnapshot){
                data.push(childSnapshot.val())
            });
                 
            const json = {"usuarios" : data};

            res.json(json);
            ref.off("value");
        },
        function(errorObject){
            console.log("Leitura falhou: " + errorObject.code);
            res.send(errorObject.code);
        }
    );
});

// recupera os dados de um usuario específico
const show = router.get('/:id', (req, res, next) => {
   const id = req.params.id;

   const ref = firebase.database().ref("/usuario/" + id);

   ref.on("value", function(snapshot){
       res.json(snapshot.val());
       ref.off("value");
   },
   function(errorObject){
       console.log("Leitura falhou: " + errorObject.code);
       res.send(errorObject.code);
   });
});

const update = router.put('/', (req, res, next) => {

    console.log("UPDATE request received.");

    const id = req.body.id;
    const nome = req.body.nome;
    const senha = req.body.senha;
    const email = req.body.email;
    const endereco = req.body.endereco;
    
    const refPath = "usuario/" + id;
    const ref = firebase.database().ref(refPath);

    ref.on("value", function(snapshot){
        // verificando se o usuario existe.
        // caso exista, nada é feito
        ref.update({ id, nome, senha, email, endereco}, function(error) {
            if (error) {
                res.send("Dados não poderam ser salvos " + error);
            } else {
                res.send("Dados salvos com sucesso " + 200);
            }
        });
        res.send(200);
        ref.off("value");
    },
    function(errorObject){
        console.log("Atualização falhou: " + errorObject.code);
        res.send(errorObject.code);
    });
});

const del = router.delete('/:id', (req, res, next) => {
    console.log("DELETE request received.");
    const id = req.params.id;

    const refPath = "usuario/" + id;
    const ref = firebase.database().ref(refPath)

    ref.on("value", function(snapshot) {
        ref.remove(function(error){
            if(error){
                res.send("Falha ao deletar " + error);
            } else {
                res.send("Deletado com sucesso " + 200);
            }
        });
        ref.off("value");
    });
});

user_app.use('/', create);
user_app.use('/', read);
user_app.use('/', show);1
user_app.use('/', update);
user_app.use('/', del);

module.exports = user_app;