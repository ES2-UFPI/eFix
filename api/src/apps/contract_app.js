'use strict'

const express = require('express');
const firebase = require('../firebase_init');
const bodyParser = require('body-parser');
const crypto = require('crypto');


const contract_app = express();
contract_app.use(bodyParser.json());
contract_app.use(bodyParser.urlencoded({extended: false}));

const router = express.Router();

// cria um novo contrato
const create = router.post('/', (req, res, next) => {
    const id_contrato = crypto.randomBytes(32).toString('hex');
    const { id_servico, id_prestador, id_usuario, data } = req.body;

    const refPath = "contratos/" + id_contrato;
    const ref = firebase.database().ref(refPath);
    ref.update({ id_contrato, id_servico, id_prestador, id_usuario, data }, function(error){
        if(error){
            res.send("Dados não poderam ser salvos " + error);
        } else
            res.sendStatus(201);
    });
    ref.off("value");
});

// recupera todos os contratos
const read = router.get('/', (req, res, next) => {
    const ref = firebase.database().ref('/contratos');

    ref.on("value", function(snapshot){
        const data = [];
        snapshot.forEach(function(childSnapshot){
            data.push(childSnapshot.val());
        });
            
        const json = {"contratos" : data};
        ref.off("value");        
        res.json(json);
    },
    function(errorObject){
        console.log("Leitura falhou: " + errorObject.code);
        res.send(errorObject.code);
    });    
});

// recupera um servico especifico
const show = router.get('/:id', (req, res, next) => {
    const id_contrato = req.params.id;

    const ref = firebase.database().ref('/contratos/' + id_contrato);

    ref.once("value", function(snapshot){
        res.json(snapshot.val());
        ref.off("value");        
    },
    function(errorObject){
        console.log("Leitura falhou: " + errorObject.code);
        res.send(errorObject.code);
    });   
});

// atualiza os dados de um contrato
const update = router.put('/', (req, res, next) => {
    const { id_contrato, id_servico, id_prestador, id_usuario, data, id_avaliacao } = req.body;

    const ref = firebase.database().ref('contratos/' + id_contrato);

    ref.update({ id_contrato, id_servico, id_prestador, id_usuario, data }, function(error){
        if(error){
            res.send("Dados não poderam ser salvos " + error);
        } else
            res.sendStatus(200);
    });
});

// deleta um servico especifico
const del = router.delete('/:id', (req, res, next) => {
    const id_contrato = req.params.id;

    const ref = firebase.database().ref('/contratos/' + id_contrato);
    ref.remove()
        .then(function(){
            res.sendStatus(200);
        })
        .catch(function(error){
            res.sendStatus(502);
        });
});

contract_app.use('/', create);
contract_app.use('/', read);
contract_app.use('/', show);
contract_app.use('/', update);
contract_app.use('/', del);

module.exports = contract_app;