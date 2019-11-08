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
    const nota_media = 0;
    const nota_somada = 0;
    const avaliacoes = [];
    const qnt_servicos_prestados = 0;
    const disponibilidade = true;

    const refPath = "prestador/" + id_prestador;
    const ref = firebase.database().ref(refPath);

    ref.update({ id_prestador, bio, horarios, servicos, contratos,
                nota_media, nota_somada, avaliacoes, qnt_servicos_prestados, disponibilidade 
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

// adiciona uma nova avaliação ao prestador
const add_avaliation_to_provider = router.post('/avaliacao', (req, res, next) => {

    const { id_prestador, avaliacao } = req.body;
    const ref = firebase.database().ref('prestador/' + id_prestador);
    
    ref.once("value", function(snapshot){
        var nota_somada = snapshot.child("nota_somada").val();
        const qnt_servicos_prestados = snapshot.child("qnt_servicos_prestados").val();
        var nota_media = (nota_somada + avaliacao.nota)/ qnt_servicos_prestados;
        nota_somada += avaliacao.nota;
        
        if(qnt_servicos_prestados == 0)
            // nota media atualmente é igual a infinito, causando erro. Atualizando valor
            nota_media = avaliacao.nota;
        
        // normalizando para valores entre 0 e 5    
        nota_media = nota_media/5;

        ref.update({ nota_media, nota_somada }, function(error){
            if (error) {
                ref.child("avaliacoes").push(avaliacao);
                res.send("Dados não poderam ser salvos " + error);
            } else {
                res.sendStatus(200);
            }
        });
        
        ref.off("value");
    });
});

// atualiza o status de disponibilidade do prestador
const change_disponibility = router.put('/status/:id_prestador', (req, res, next) => {
    const id_prestador = req.params.id_prestador;

    const refPath = "prestador/" + id_prestador;
    const ref = firebase.database().ref(refPath);

    ref.once("value", function(snapshot){
        const disponibilidade = !snapshot.child("disponibilidade").val();

        ref.update({ disponibilidade }, function(error){
            if (error) {
                res.send("Dados não poderam ser salvos " + error);
            } else {
                res.sendStatus(200);
            }
        })
        ref.off("value");
    });
});

provider_app.use('/', create);
provider_app.use('/', read);
provider_app.use('/', show);
provider_app.use('/', update);
provider_app.use('/', del);
provider_app.use('/', add_service_to_provider);
provider_app.use('/', add_avaliation_to_provider);
provider_app.use('/', change_disponibility);

module.exports = provider_app;