'use strict'

const express = require('express');
const firebase = require('../firebase_init');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const provider_app = express();
provider_app.use(bodyParser.json());
provider_app.use(bodyParser.urlencoded({extend: false}));

const router = express.Router();

const create = router.post('/', (req, res, next) => {
 
    const id_prestador = crypto.randomBytes(32).toString('hex');
    const bio = req.body.bio;
    const horarios = [];
    const servicos = [];
    const contratos = [];
    const nota = 0;
    const avaliacoes = [];
    const qnt_servicos_prestados = 0;
    const disponibilidade = true;

    const refPath = "prestador/" + id_prestador;
    const ref = firebase.database().ref(refPath);

    ref.update({ id_prestador, bio, horarios, servicos, contratos,
                nota, avaliacoes, qnt_servicos_prestados, disponibilidade 
                }, function(error) {
                    if (error) {
                        res.send("Dados não poderam ser salvos " + error);
                    } else {
                        res.send( id_prestador + " criado com sucesso " + 200);
                    }
        ref.off("value");
    });
});

const read = router.get('/', (req, res, next) => {
    const ref = firebase.database().ref("prestador/");

    ref.on(
        "value", function(snapshot){
            const data = [];
            snapshot.forEach(function(childSnapshot){
                data.push(childSnapshot.val())
            });
                 
            const json = {"prestadores": data};

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
 
    const ref = firebase.database().ref("prestador/" + id);
 
    ref.on("value", function(snapshot){
        res.json(snapshot.val());
        ref.off("value");
    },
    function(errorObject){
        console.log("Leitura falhou: " + errorObject.code);
        res.send(errorObject.code);
    });
 });

 // atualiza os dados do prestador
const update = router.put('/', (req, res, next) => {
    console.log("UPDATE request received.");

    const { id_prestador, bio, horarios, servicos,
            contratos, nota, avaliacoes, qnt_servicos_prestados,
            disponibilidade } = req.body;

    const refPath = "prestador/" + id_prestador;
    const ref = firebase.database().ref(refPath);

    ref.update({ id_prestador, bio, horarios, servicos, contratos,
                nota, avaliacoes, qnt_servicos_prestados, disponibilidade 
                }, function(error) {
                    if (error) {
                        res.send("Dados não poderam ser salvos " + error);
                    } else {
                        res.send("Dados salvos com sucesso " + 200);
                    }
        ref.off("value");
    });
});

// deleta um prestador
const del = router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    
    const refPath = "prestador/" + id;
    const ref = firebase.database().ref(refPath);
 
    ref.remove(function(error){
        if(error){
            res.send("Falha ao deletar " + error);
        } else {
            res.send("Deletado com sucesso " + 200);
        }
    });
});

// adiciona um novo servico na lista do prestador
const add_service_to_provider = router.post('/add/:id_servico', (req, res, next) => {

    const { id_prestador } = req.body;
    const id_servico = req.params.id_servico;
    
    const ref = firebase.database().ref('prestador/' + id_prestador);
    ref.child("servicos").push(id_servico);
    ref.off();

    res.sendStatus(200);
});

provider_app.use('/', create);
provider_app.use('/', read);
provider_app.use('/', show);
provider_app.use('/', update);
provider_app.use('/', del);
provider_app.use('/', add_service_to_provider);

module.exports = provider_app;