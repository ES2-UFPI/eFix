'use strict'

const express = require('express');
const firebase = require('../firebase_init');
const bodyParser = require('body-parser');

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

const validate = router.put('/validar', (req, res, next) => {
    const { id_prestador, id_servico, data } = req.body;
    
    console.log(`VALIDATE request received for date ${data}`);

    var ref = firebase.database().ref(`/servico/${id_servico}`).on("value", function(snapshot){
        if(snapshot.val() == null){
            res.status(406).json({ message: `invalid service id ${id_servico}` }).send();
            console.log(`invalid service id ${id_servico}`);
        }
    });
    var ref = firebase.database().ref(`/prestador/${id_prestador}`).on("value", function(snapshot){
        if(snapshot.val() == null){
            res.status(406).json({ message: `invalid provider id ${id_prestador}` }).send();
            console.log(`invalid provider id ${id_prestador}`);
        }
    });
        
    console.log("IDs passed are valid");

    var date1 = new Date();
    date1.setTime(data);

    const dia = date1.getDate();
    const mes = date1.getMonth();
    const ano = date1.getFullYear();
    const hora = date1.getHours();
    const minute = date1.getMinutes();

    var ref = firebase.database().ref(`/servicos/${id_servico}/duracao`);
    var duracao = null;

    ref.on("value", function(snapshot){
        duracao = snapshot.val();
        ref.off("value");
    });

    ref = firebase.database().ref(`/contratos`).orderByChild("id_prestador").equalTo(id_prestador);
    
    var contracts_after = [];
    var contracts_before = [];

    ref.on("value", function(snapshot){
        snapshot.forEach(function(childsnapshot){
            var contract = childsnapshot.val();
            if(contract.data.dia == dia && contract.data.mes == mes && contract.data.ano == ano){
                console.log(`contrato para este dia encontrato.`)
                if(contract.data.data < data){
                    contracts_before.push(contract);
                } else if(contract.data.data == data){
                    res.status(402).json({ message: "Invalid date selected, provider is not free. Equal date." }).send();
                } else {
                    contracts_after.push(contract); 
                }
            }
        });
    });

    if(contracts_after.length == 0 && contracts_before.length == 0)
        res.status(200).json({ message: "Valid date, provider is totally free" }).send(); 
    
    contracts_before.sort(function(a, b){
        if(a < b) return -1;
        if(a > b) return 1;
        return 0;
    });

    contracts_after.sort(function(a, b){
        if(a < b) return -1;
        if(a > b) return 1;
        return 0;
    });

    const previous = contracts_before[contracts_before.length-1];
    const after = contracts_after[0];

    try {
        if(previous.data.hora + duracao[0] < hora){
            if(previous.data.min + duracao[1] == 60)
                if((previous.data.hora + duracao[0] +1 < hora && minute == 0)){
                    console.log(`previous ${contract.id_contrato}`);
                    throw new error;
                }
        }else if(previous.data.hora == hora){
            if(!(previous.data.min + duracao[1] < minute)){
                console.log(`previous equal ${contract.id_contrato}`);
                throw new error;
            }
        } else throw new error;
    
        if(hora + duracao[0] > after.data.hora){
            console.log(`after ${contract.id_contrato}`);
            throw new error;
        }else if(hora + duracao[0] < after.data.hora){
            if(minute + duracao[1] == 60){  
                if(hora + duracao[0] +1 >= after.data.hora && after.data.min == 0){
                    console.log(`after ${contract.id_contrato}`);
                    throw new error;
                }
            }
        }else if(hora + duracao[0] == after.data.hora){
            if(minute + duracao[1] >= after.data.min){
                console.log(`after ${contract.id_contrato}`);
                throw new error;
            }
        }
    } catch (error) {
        res.status(402).json({ message: "Invalid date selected, provider is not free",
                               contracts_before: contracts_before,
                               contracts_after: contracts_after
        }).send();
    }

    res.status(200).json({ message: "Valid date, provider is free" }).send();
});

schedule_app.use('/', create);
schedule_app.use('/', show);
schedule_app.use('/', update);
schedule_app.use('/', del);
schedule_app.use('/', validate);

module.exports = schedule_app;