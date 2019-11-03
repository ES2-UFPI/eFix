'use strict'

const util = require('../util.js');
const express = require('express');
const firebase = require('firebase');
const bodyParser = require('body-parser');
const crypto = require('crypto');

firebase.initializeApp(util);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));

const router = express.Router();

// Cria servico
const create_service = router.post('/', (req, res, next) => {
    console.log("Requisicao de POST de Servico recebida.");

    const id_prestador = req.body.id_prestador;
    const id_servico = crypto.randomBytes(32).toString('hex');
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
const read_services = router.get('/', (req, res, next) => {
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
const read_service = router.get('/id/:id', (req, res, next) => {
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
const read_services_by_category = router.get('/categ/:categ', (req, res, next) => {
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

// recupera serviços com preço abaixo do recebido
const read_services_under_price = router.get('/preco/:preco', (req, res, next) => {
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
                if(parseFloat(servico["preco"]) <= parseFloat(preco)){
                    under_prices.push(servico);
                }
            });


            const json = {"servicos" : under_prices};

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
const search_services = router.get('/busca/:busca', (req, res, next) => {
    var frase = req.params.busca;
    console.log("Reqisicao GET por serviços com \"" + frase + "\" no nome.");

    // to lower case
    frase = frase.toLowerCase();

    // separando a busca recebida em palavras
    const frase_array = frase.split(" ");

    const words = [];
    // descartando palavras com menos de 3 letras (o, a, e, de, se, ...etc)
    frase_array.forEach(word =>{
        if (word.length > 2){
            // verificando se é plural
            const lastSindex = word.lastIndexOf('s');
            if(lastSindex == word.length-1){
                // removendo o s
                word = word.slice(0, lastSindex);
            }
            words.push(word);
        }
    });
    
    const ref = firebase.database().ref("/servico");

    ref.on("value", function(snapshot){
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
                        nomes.push(word.toLowerCase());
                    }
                });
                
                var counter = 0;
                // verificando se as palavras restantes sao pelo menos uma das recebidas
                nomes.forEach(word =>{
                    // verificando se a palavra esta no plural
                    const lastIndex = word.lastIndexOf('s');
                    if(lastIndex == word.length-1){
                        // se o ultimo indice de S na palavra for o ultimo elemento, removendo o s
                        word = word.slice(0, lastIndex);
                    }
                    if(words.indexOf(word) >= 0){
                        counter = counter + 1;
                    }
                });
                // se a quantidade de palavras do nome do serviço for igual o numero de recebidas
                // o serviço sera retornado. Não incluindo palavras descartadas
                if (counter == words.length){
                    resultados.push(servico);
                }
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

app.use('/servico', create_service);
app.use('/servico', read_services);
app.use('/servico', read_service);
app.use('/servico', read_services_by_category)
app.use('/servico', read_services_under_price);
app.use('/servico', search_services);

////////// CATEGORIA ///////////
// recupera categorias
const read_category = router.get('/list', (req, res, next) => {
    console.log("Reqisicao GET categorias recebida.");
    const ref = firebase.database().ref("/categoria/");

    ref.on(
        "value", function(snapshot){
            const data = [];
            snapshot.forEach(function(childSnapshot){
                data.push(childSnapshot.val())
            });
                 
            const json = {"categorias" : data};

            res.json(json);
            ref.off("value")
        },
        function(errorObject){
            console.log("Leitura falhou: " + errorObject.code);
            res.send(errorObject.code);
        }
    );    
});

const create_category = router.post('/new', (req, res, next) => {
    console.log("Requisicao de POST de categoria recebida.");

    const id = req.body.id;
    const nome = req.body.nome;

    const refPath = "categoria/" + id;
    const ref = firebase.database().ref(refPath)

    ref.update({ id, nome }, function(error) {
        if (error) {
            res.send("Dados não poderam ser salvos " + error);
        } else {
            res.send("Dados salvos com sucesso " + 200);
        }
    });
});

const update_category = router.put('/att', (req, res, next) => {
    const id = req.body.id;
    const nome = req.body.nome;
    console.log("Update para " + id + " recebido. Novo nome: " + nome);

    const refPath = "/categoria/" + id + "/";
    const ref = firebase.database().ref(refPath);

    ref.update({ nome }, function(error) {
        if(error){
            res.send("Falha na atualização " + error);
        } else {
            res.send("Atualizado com sucesso " + 200);
        }
    });
});

const delete_category = router.delete('/del', (req, res, next) => {
    const id = req.body.id;
    const refPath = "/categoria/" + id + "/";

    console.log("DLETE request " + id + " received.")
    
    const ref = firebase.database().ref(refPath);

    ref.remove(function(error) {
        if(error){
            res.send("Falha ao deletar " + error);
        } else {
            res.send("Deletado com sucesso " + 200);
        }
    })
})

app.use('/categoria', read_category);
app.use('/categoria', create_category);
app.use('/categoria', update_category);
app.use('/categoria', delete_category);

module.exports = app;