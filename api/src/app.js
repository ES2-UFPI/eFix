'use strict'

const util = require('../util.js');
const express = require('express');
const firebase = require('firebase');
const bodyParser = require('body-parser');

firebase.initializeApp(util);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));

const router = express.Router();

// Cria servico
const create = router.post('/', (req, res, next) => {
    console.log("Requisicao de POST de Servico recebida.");

    const id_prestador = req.body.id_prestador;
    const id_servico = req.body.id_servico;
    const categoria = req.body.categoria;
    const nome = req.body.nome;
    const preco = req.body.preco;
    const descricao = req.body.descricao;

    const refPath = "servico/" + id_servico;
    const ref = firebase.database().ref(refPath)

    ref.update({ id_prestador, id_servico, categoria, nome, preco, descricao }, function(error) {
        if (error) {
            res.send("Dados não poderam ser salvos " + error);
        } else {
            res.send("Dados salvos com sucesso " + 200);
        }
    });
});

// recupera servicos
const read_all = router.get('/', (req, res, next) => {
    console.log("Reqisicao GET all recebida.");
    const ref = firebase.database().ref("/servico/");

    ref.on(
        "value", function(snapshot){
            const data = [];
            snapshot.forEach(function(childSnapshot){
                data.push(childSnapshot.val())
            });
                 
            const json = {"servicos" : data};

            res.json(json);
            ref.off("value")
        },
        function(errorObject){
            console.log("Leitura falhou: " + errorObject.code);
            res.send(errorObject.code);
        }
    );    
});

// recupera um servico em especifico
const show = router.get('/id/:id', (req, res, next) => {
    const id = req.params.id;
    console.log("Reqisicao GET pelo serviço " + id);

    const ref = firebase.database().ref("/servico").orderByChild("id_servico").equalTo(id);

    ref.on(
        "value", function(snapshot){
            const data = [];
            snapshot.forEach(function(childSnapshot){
                data.push(childSnapshot.val())
            });
                 
            const json = {"servicos" : data};

            res.json(json);
            ref.off("value")
        },
        function(errorObject){
            console.log("Leitura falhou: " + errorObject.code);
            res.send(errorObject.code);
        }
    );    
})

// recupera todos os servicos de uma categoria
const read_categ = router.get('/categ/:categ', (req, res, next) => {
    const categ = req.params.categ;
    console.log("Reqisicao Pedido pela categoria " + categ);

    const ref = firebase.database().ref("/servico").orderByChild("categoria").equalTo(categ);

    ref.on(
        "value", function(snapshot){
            const data = [];
            snapshot.forEach(function(childSnapshot){
                data.push(childSnapshot.val())
            });
                 
            const json = {"servicos" : data};

            res.json(json);
            ref.off("value")
        },
        function(errorObject){
            console.log("Leitura falhou: " + errorObject.code);
            res.send(errorObject.code);
        }
    );    
})

// recupera um servico em especifico
const search_under_price = router.get('/preco/:preco', (req, res, next) => {
    const preco = req.params.preco;
    console.log("Reqisicao GET por serviços com preço abaixo de " + preco);

    const ref = firebase.database().ref("/servico");

    ref.on(
        "value", function(snapshot){
            const data = [];
            snapshot.forEach(function(childSnapshot){
                data.push(childSnapshot.val())
            });
            
            // filtrando somente os servicos abaixo do preço recebido
            const under_prices = [];

            data.forEach(servico => {
                if(servico["preco"] <= preco){
                    under_prices.push(servico);
                }
            });

            const json = {"servicos" : data};

            res.json(json);
            ref.off("value")
        },
        function(errorObject){
            console.log("Leitura falhou: " + errorObject.code);
            res.send(errorObject.code);
        }
    );    
})

// recupera serviços que contenham as palavras recebidas no nome
const busca = router.get('/busca/:busca', (req, res, next) => {
    const frase = req.params.busca;
    console.log("Reqisicao GET por serviços com \"" + frase + "\" no nome.");

    // separando a busca recebida em palavras
    const frase_array = frase.split(" ");

    const words = [];
    // descartando palavras com menos de 3 letras (o, a, e, de, se, ...etc)
    frase_array.forEach(word =>{
        if (word.length > 2){
            words.push(word);
        }
    });

    console.log(words);
    
    const ref = firebase.database().ref("/servico");

    ref.on(
        "value", function(snapshot){
            // coleta todos os serviços
            const data = [];
            snapshot.forEach(function(childSnapshot){
                data.push(childSnapshot.val())
            });
            
            // filtrando somente os servicos com as palavras recebidas
            const resultados = [];
            // avaliando servico por serviço
            data.forEach(servico => {
                const nomes = [];
                // separando o nome dos servicos em palavras
                const name_words = servico["nome"].split(" ");
                // descartando menos de 3 letras
                name_words.forEach(word =>{
                    if (word.length > 2){
                        nomes.push(word);
                    }
                });

                console.log("Servico: " + nomes);
                // verificando se as palavras restantes sao pelo menos uma das recebidas
                nomes.forEach(word =>{
                    if(words.indexOf(word) >= 0){
                        // verificando se o serviço ja nao foi adicionado com uma palavra anterior
                        if (!resultados.includes(servico)){
                            resultados.push(servico);
                        }
                    }
                });
            });

        const json = {"servicos" : resultados};
    
        res.json(json);
        ref.off("value")
        });
        },
        function(errorObject){
            console.log("Leitura falhou: " + errorObject.code);
            res.send(errorObject.code);
    }
);

app.use('/servico', read_all);
app.use('/servico', create);
app.use('/servico', show);
app.use('/servico', read_categ)
app.use('/servico', search_under_price);
app.use('/servico', busca);

module.exports = app;