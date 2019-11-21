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
    console.log("CREATE schedule for " + id_prestador);

    const horario = schedule;

    const refPath = "prestador/" + id_prestador;
    const ref = firebase.database().ref(refPath);

    ref.update({ horario }, function(error) {
        if (error) {
            res.send("Dados não poderam ser salvos " + error);
        } else {
            res.status(201).send();
        }
    });
    ref.off("value");
});

// recupera todo o horario do prestador
const show = router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    console.log("GET schedule of " + id);
    
    const ref = firebase.database().ref("prestador/" + id + '/horario');
    
    ref.on("value", function(snapshot){
        res.json(snapshot.val());
        ref.off("value");
    },
    function(errorObject){
        console.log("Leitura falhou: " + errorObject.code);
        res.send(errorObject.code);
    });
});

schedule_app.use('/', create);
schedule_app.use('/', show);

module.exports = schedule_app;