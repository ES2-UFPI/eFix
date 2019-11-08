'use strict'

const express = require('express');
const firebase = require('../firebase_init');
const bodyParser = require('body-parser');
const crypto = require('crypto');


const service_app = express();
service_app.use(bodyParser.json());
service_app.use(bodyParser.urlencoded({extended: false}));

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
            res.redirect(307, '../prestador/add/' + id_servico);
        }
    });
});

// recupera servicos
const read_services = router.get('/', (req, res, next) => {
    const ref = firebase.database().ref("/servico");

    ref.on(
        "value", function(snapshot){
            const data = [];
            snapshot.forEach(function(childSnapshot){
                data.push(childSnapshot.val());
            });
            
            const json = {"servicos" : data};
            ref.off("value");        
            res.json(json);
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

    const ref = firebase.database().ref("/servico/" + id);
    ref.on("value", function(snapshot){
            data.push(childSnapshot.val());
            res.json(snapshot.val());
            ref.off("value");
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
                data.push(childSnapshot.val());
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
                data.push(childSnapshot.val());
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
                data.push(childSnapshot.val());
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

// atualiza os dados de um serviço com o ID fornecido com os novos vindos no json
const update_service = router.put('/', (req, res, next) => {
    const id_prestador = req.body.id_prestador;
    const id_servico = req.body.id_servico;
    const categoria = req.body.categoria;
    const nome = req.body.nome;
    const preco = req.body.preco;
    const descricao = req.body.descricao;
    
    console.log("UPDATE " + id_servico + " recebida");

    const refPath = "servico/" + id_servico;
    const ref = firebase.database().ref(refPath)

    ref.update({ id_prestador, id_servico, categoria, nome, preco, descricao }, function(error) {
        if (error) {
            res.send("Dados não poderam ser atualizados " + error);
        } else {
            res.send("Dados atualizados com sucesso " + 200);
        }
    });
});

// deleta um servico com o id recebido.
const delete_service = router.delete('/', (req, res, next) => {
    const id_servico = req.body.id_servico;

    console.log("DELETE " + id_servico + " recebida");

    const refPath = "servico/" + id_servico + "/";
    const ref = firebase.database().ref(refPath);

    ref.remove(function(error) {
        if(error){
            res.send("Falha ao deletar " + error);
        } else {
            res.send("Deletado com sucesso " + 200);
        }
    });
});

const read_provider_services = router.get('/prestador/:id', (req, res, next) => {
    console.log("GET provider services request received.");

    const id = req.params.id;

    var ref = firebase.database().ref("/servico").orderByChild("id_prestador").equalTo(id);
    ref.on("value", function(snapshot){
        const data = [];
        snapshot.forEach(function(childSnapshot){
            data.push(childSnapshot.val())
        });

        res.json({ "servicos": data });      
        ref.off("value");
    },
    function(errorObject){
        console.log("Leitura falhou: " + errorObject.code);
        res.send(errorObject.code);
    });
});

// const read_provider_services2 = router.get('/prestador/', (req, res, next) => {
//     console.log("GET provider services request received.");

//     const { id_servicos } = req.body;
//     const result = [];

//     var ref = firebase.database().ref("/servico").orderByChild("id_servico");
//     id_servicos.forEach(id =>{

//         ref.equalTo(id).on("value", function(snapshot){
//             result.push(snapshot.val());
//         });
//     });
//     ref.off("value");
//     res.json({ "servicos": result });
// });

service_app.use('/', create_service);
service_app.use('/', read_services);
service_app.use('/', read_service);
service_app.use('/', read_services_by_category)
service_app.use('/', read_services_under_price);
service_app.use('/', search_services);
service_app.use('/', update_service);
service_app.use('/', delete_service);
service_app.use('/', read_provider_services);

module.exports = service_app;