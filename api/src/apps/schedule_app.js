'use strict'

const express = require('express');
const firebase = require('../firebase_init');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const schedule_app = express();
schedule_app.use(bodyParser.json());
schedule_app.use(bodyParser.urlencoded({extended: false}));

const router = express.Router();

// cria um novo horario para o prestador
const create = router.post('/', (req, res, next) => {
    const { id_prestador, schedule } = req.body;

    const horario = schedule;

    const refPath = "prestador/" + id_prestador;
    const ref = firebase.database().ref(refPath);
    ref.once("value", function(snapshot){
        if(snapshot.val() == null)
            res.sendStatus(401);

        ref.update({ horario }, function(error) {
            if (error) {
                res.send("Dados não poderam ser salvos " + error);
            } else {
                res.status(201).send();
            }
        });
        ref.off("value"); 
    }, function(errorObject){
        res.sendStatus(401);
    });
});

// recupera todo o horario do prestador
const show = router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    
    const ref = firebase.database().ref("prestador/" + id);
    
    ref.once("value", function(snapshot){
        if(snapshot.val() == null)
            res.sendStatus(401);
        else{
            res.json(snapshot.child("horario").val());
            ref.off("value");
        }
    },
    function(errorObject){
        console.log("Leitura falhou: " + errorObject.code);
        res.sendStatus(401);
    });
});

// atualiza as informações de horario de um prestador
const update = router.put('/', (req, res, next) => {
    const { id_prestador, horario } = req.body;

    const refPath = "prestador/" + id_prestador;
    const ref = firebase.database().ref(refPath);

    ref.once("value", function(snapshot){
        if(snapshot.val() == null)
            res.sendStatus(406);

        ref.update({ horario }, function(error) {
            if (error) {
                res.send("Dados não poderam ser atualizados " + error);
            } else {
                res.status(200).send();
            }
        });
        ref.off("value"); 
    }, function(errorObject){
        res.sendStatus(401);
    });
});

// delete o horario de um prestador
const del = router.delete('/:id', (req, res, next) => {
    const { id } = req.params;

    const refPath = "prestador/" + id;
    var ref = firebase.database().ref(refPath);
    
    ref.once("value", function(snapshot){
        if(snapshot.val() == null)
            res.sendStatus(406);

        ref.child("horario").remove();
        res.sendStatus(200);
    }, function(errorObject){
        res.sendStatus(401);
    });
});

const validate = router.get('/validar', (req, res, next) => {
    const { id_prestador, id_servico, data } = req.body;

    if(!verifyProvider(id_prestador))
        res.status(402).json({ message: `invalid provider id ${id_prestador}` }).send();
    else if(!verifyService(id_servico))
        res.status(402).json({ message: `invalid service id ${id_servico}` }).send();
    
    const date = Date(data);
    const dia = date.getDate();
    const mes = date.getMonth();
    const ano = date.getFullYear();
    const hora = date.getHours();
    const minute = date.getMinutes();

    var ref = firebase.database().ref(`/servicos/${id_servico}/duracao`);
    var duracao = null;

    ref.on("value", function(snapshot){
        duracao = snapshot.val();
        ref.off("value");
    });

    ref = firebase.database().ref(`contratos/`).orderByChild("id_prestador").equalTo(id_prestador);
    
    ref.on("value", function(snapshot){
        var contracts_after = [];
        var contracts_before = [];
        
        snapshot.forEach(function(childsnapshot){
            var contract = childsnapshot.val();
            if(contract.dia == dia && contract.mes == mes && contract.ano == ano){
                if(contract.hora < hora){
                    contracts_before.push(contract);
                } else if( contract.hora == hora){
                    if(contract.min < minute){
                        contracts_before.push(contract);
                    } else if(contract.min == minute){
                        res.status(402).json({ message: "Invalid date selected, provider is not free" }).send();
                    } else {
                        contracts_after.push(contract);
                    }
                } else {
                    contracts_after.push(contract); 
                }
            }
        });

        contracts_before.forEach(contract => {
            if(contract.hora + duracao[0] < hora){
                if(contract.min + duracao[1] == 60){
                    if(contract.hora + duracao[0] +1 < hora){
                        
                    }
                }
            }else if(contract.hora + duracao[0] == hora){
                if(contract.min + duracao[1] < min){
                    
                } else 
                    res.status(402).json({ message: "Invalid date selected, provider is not free" }).send();
            }
        });


        
    });

    



});

function verifyService(id){
    var ref = firebase.database().ref(`/servico/${id}`).on("value", function(snapshot){ref = snapshot.val()});

    if(ref != null)
        return true;
    else return false;
}

function verifyProvider(id){
    var ref = firebase.database().ref(`/prestador/${id}`).on("value", function(snapshot){ref = snapshot.val()});

    if(ref != null)
        return true;
    else return false;
}


schedule_app.use('/', create);
schedule_app.use('/', show);

module.exports = schedule_app;