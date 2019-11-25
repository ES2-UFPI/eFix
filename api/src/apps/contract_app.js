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
    var { id_servico, id_prestador, id_usuario, data } = req.body;
    const ativo = true;

    data = Date(data);

    const refPath = "contratos/" + id_contrato;
    
    const ref = firebase.database().ref(refPath);

    ref.update({ id_servico, id_contrato, id_prestador, id_usuario, data, ativo }, function(error){
        if(error){
            res.send("Dados não poderam ser salvos " + error);
        } else{
            var ref = firebase.database().ref('prestador/' + id_prestador);
            ref.child("contratos").push(id_contrato);
            ref.off();

            ref = firebase.database().ref('usuario/' + id_usuario);
            ref.child("contratos").push(id_contrato);
            ref.off();
            
            res.status(201).json({ id_contrato: id_contrato }).send();
        }
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

// altera o campo ativo para false
const close_contract = router.put('/close/:id', (req,res, next) => {
    const id_contrato = req.params.id;
    const ativo = false;
    const ref = firebase.database().ref('contratos/' + id_contrato);

    ref.update({ ativo }, function(error){
        if(error){
            res.sendStatus(502);
        } else{
            ref.off("value");
            
            ref.once("value", function(snapshot){
                const id_prestador = snapshot.child("id_prestador").val();
                res.redirect(307, '../../prestador/incremento/' + id_prestador);
                ref.off("value");
            });
        }
    });
});

// recupera todos os contratos de um usuario
const read_user_contracts = router.get('/usuario/:id', (req, res, next) =>{
    const id_usuario = req.params.id;

    const ref = firebase.database().ref('contratos/').orderByChild("id_usuario").equalTo(id_usuario);

    ref.on("value", function(snapshot){
        const data = [];
        snapshot.forEach(function(childSnapshot){
            data.push(childSnapshot.val())
        });

        res.json({ "contratos": data });      
        ref.off("value");
    },
    function(errorObject){
        console.log("Leitura falhou: " + errorObject.code);
        res.send(errorObject.code);
    });
});

// recupera todos os contratos de um usuario
const read_provider_contracts = router.get('/prestador/:id', (req, res, next) =>{
    const id_usuario = req.params.id;

    const ref = firebase.database().ref('contratos/').orderByChild("id_prestador").equalTo(id_usuario);

    ref.on("value", function(snapshot){
        const data = [];
        snapshot.forEach(function(childSnapshot){
            data.push(childSnapshot.val())
        });

        res.json({ "contratos": data });      
        ref.off("value");
    },
    function(errorObject){
        console.log("Leitura falhou: " + errorObject.code);
        res.send(errorObject.code);
    });
});

const add_review = router.post('/avaliacao', (req, res, next) => {
    const { id_contrato } = req.body;
    const avaliacao = crypto.randomBytes(32).toString('hex');
    
    const ref = firebase.database().ref('contratos/' + id_contrato);

    ref.update({ avaliacao }, function(error){
        if(error){
            res.sendStatus(502);
        } else
            res.redirect(307, '../../prestador/avaliacao/' + avaliacao);
    })
    ref.off("value");
});

contract_app.use('/', create);
contract_app.use('/', read);
contract_app.use('/', show);
contract_app.use('/', update);
contract_app.use('/', del);
contract_app.use('/', close_contract);
contract_app.use('/', read_user_contracts);
contract_app.use('/', read_provider_contracts);
contract_app.use('/', add_review);

module.exports = contract_app;