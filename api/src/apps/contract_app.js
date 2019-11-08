
const express = require('express');
const firebase = require('../firebase_init');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const contract_app = express();
contract_app.use(bodyParser.json());
contract_app.use(bodyParser.urlencoded({extended: false}));

const router = express.Router();

const create = router.post('/', (req, res, next) => {
    const { id_prestador, id_usuario, id_servico, data,  id_avaliacao} = req.body;
    const id_contrato = crypto.randomBytes(32).toString('hex');

    ref = firebase.database().ref('/contratos/' + id_contrato);

    ref.update({ id_contrato, id_prestador, id_usuario, id_servico, data, id_avaliacao}, function(error){
        if(error){
            res.send("Dados não podem ser salvos.").statusCode(error);
        }else
            res.redirect(307, '../prestador/contrato');
    })

    ref.off("value");
});

const read = router.get('/', (req, res, next) => {

});

const show = router.get('/:id_contrato', (req, res, next) => {

});

const update = router.put('/', (req, res, next) => {

});

const del = router.delete('/:id_contrato', (req, res, next) => {

});


contract_app.use('/', create);
contract_app.use('/', read);
contract_app.use('/', show);
contract_app.use('/', update);
contract_app.use('/', del);

module.exports = contract_app;