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
    
    const dt = new Date();
    dt.setTime(data);

    data ={
        data: dt.getTime(), 
        dia: dt.getDate(),
        mes: dt.getMonth(),
        ano: dt.getFullYear(),
        hora: dt.getHours(),
        min: dt.getMinutes()
    } 

    console.log(data);

    const refPath = "contratos/" + id_contrato;
    
    const ref = firebase.database().ref(refPath);

    ref.update({ id_contrato, id_prestador, id_servico, id_usuario, data, ativo }, function(error){
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

                const refPath = "prestador/" + id_prestador;
                const ref2 = firebase.database().ref(refPath);

                ref2.once("value", function(snapshot){
                    const qnt_servicos_prestados = snapshot.child("qnt_servicos_prestados").val() + 1;

                    ref2.update({ qnt_servicos_prestados }, function(error){
                        if (error) {
                            res.send("Dados não poderam ser salvos " + error);
                        } else 
                            res.sendStatus(200);
                    })
                    ref2.off("value");
                });
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
    const { id_contrato, avaliacao } = req.body;
    const { nota, comentario } = avaliacao;
    const id_avaliacao = crypto.randomBytes(32).toString('hex');
    avaliacao.id_avaliacao = id_avaliacao;
    const ref = firebase.database().ref('contratos/' + id_contrato);

    ref.update({ avaliacao }, function(error){
        if(error){
            res.sendStatus(502);
        } else{
            const id_prestador = null;
            ref.on("value", function(snapshot){
                id_prestador = snapshot.child("id_prestador").val();
            });
            ref.off("value");

            var ref2 = firebase.database().ref('prestador/' + id_prestador);
            
            ref2.once("value", function(snapshot){
                var nota_somada = snapshot.child("nota_somada").val();
                const qnt_servicos_prestados = snapshot.child("qnt_servicos_prestados").val();
                var nota_media = (nota_somada + avaliacao.nota)/ qnt_servicos_prestados;
                nota_somada += avaliacao.nota;
                
                if(qnt_servicos_prestados == 0 || qnt_servicos_prestados == null)
                    // nota media atualmente é igual a infinito, causando erro. Atualizando valor
                    nota_media = avaliacao.nota;
                
                // normalizando para valores entre 0 e 5    
                nota_media = nota_media/5;

                ref2.update({ nota_media, nota_somada }, function(error){
                    if (error) {
                        res.send("Dados não poderam ser salvos " + error);
                    } else{
                        ref2.off("value");
                        ref2 = firebase.database().ref('prestador/' + id_prestador + '/avaliacoes/' + id_avaliacao);
                        ref2.update({ id_avaliacao, comentario, nota, id_contrato }, function(error){
                            if(error){
                                res.sendStatus(502);
                            } else
                                res.sendStatus(200);
                        });
                    }
                });
                ref2.off("value");
            });
        }
    })
    ref.off("value");
});

const get_contracts_of_day = router.put('/prestador/data/:id_prestador', (req, res, next) => {
    const { id_prestador } = req.params;
    const { data } = req.body;
    
    var date1 = new Date();
    date1.setTime(data);

    const dia = date1.getDate();
    const mes = date1.getMonth();
    const ano = date1.getFullYear();

    const ref1 = firebase.database().ref("contratos/").orderByChild("id_prestador").equalTo(id_prestador);

    var contracts_after = [];
    var contracts_before = [];

    ref1.on("value", function(snapshot){
        snapshot.forEach(function(childsnapshot){
            var contract = childsnapshot.val();
            if(contract.data.ano == ano && contract.data.mes == mes && contract.data.dia == dia){
                if(contract.data.data < data){
                    contracts_before.push(contract);
                } else
                    contracts_after.push(contract); 
            }
        });
        res.status(200).json({
            before: contracts_before,
            after: contracts_after
        }).send();
        
        ref1.off("value");
    }, function(errorObject){
        res.status(402).json({ error: errorObject }).send();
    });
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
contract_app.use('/', get_contracts_of_day);

module.exports = contract_app;