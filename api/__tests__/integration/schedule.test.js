const request = require('supertest');
const schedule_app = require('../../src/apps/schedule_app');
const user_app = require('../../src/apps/user_app');
const provider_app = require('../../src/apps/provider_app');
const service_app = require('../../src/apps/service_app');
const contract_app = require('../../src/apps/contract_app');

const firebase = require('../../src/firebase_init');

describe('Running Tests...', () =>{
    var id_prestador = null;
    var id_servico = null;
    beforeAll(async done => {
        var response = await request(user_app).post('/').send({
            nome :  "Jose" ,
            senha :  "003dsd12" ,
            email :  "meuemail@example.com" ,
            endereco :  "Rua do Cangaço, 3455, ZP, SP, SP" 
        });
    
        const user_id_created = response.body.id_usuario;
        
        response = await request(provider_app).post('/').send({
           bio: "Ola!",
           id_usuario: user_id_created
        })

        id_prestador = response.body.id_prestador;

        response = await request(service_app).post('/').send({
            id_prestador: id_prestador,
            categoria: "Eletricista",
            nome: "Troca de  Fios",
            descricao: "Troco os fios da sua casa",
            preco: "40",
            duracao: [2, 15] // [hr, min]
        });

        id_servico = response.body.id_servico;

        response = await request(contract_app).post('/').send({
            id_prestador: id_prestador,
            id_usuario: user_id_created,
            id_servico: id_servico,
            data: new Date("November 23, 2019 05:30").getTime()
        });

        done();
    });
    
    afterAll(done => {
        firebase.database().ref().remove();
        done();
    });

    it('create provider schedules', async (done) => {
        const json = {
            id_prestador: id_prestador,
            schedule: {
                segunda: [["08:00", "12:00"], ["14:00", "18:00"]],
                terca:   [["08:00", "12:00"], ["14:00", "18:00"]],
                quarta:  [["08:00", "12:00"], ["14:00", "18:00"]],
                quinta:  [["08:00", "12:00"], ["14:00", "18:00"]],
                sexta:   [["08:00", "12:00"], ["14:00", "18:00"]],
                sabado:  [["08:00", "12:00"]],
                domingo: []
            }
        }
        
        const response = await request(schedule_app)
        .post('/')
        .send(json)

        expect(response.status).toBe(201);
        done();
    });

    it('should not create provider schedules with invalid id', async (done) => {
        const json2 = {
            id_prestador: "dummy",
            schedule: {
                segunda: [["08:00", "12:00"], ["14:00", "18:00"]],
                terca:   [["08:00", "12:00"], ["14:00", "18:00"]],
                quarta:  [["08:00", "12:00"], ["14:00", "18:00"]],
                quinta:  [["08:00", "12:00"], ["14:00", "18:00"]],
                sexta:   [["08:00", "12:00"], ["14:00", "18:00"]],
                sabado:  [["08:00", "12:00"]],
                domingo: []
            }
        }
        const response = await request(schedule_app)
        .post('/')
        .send(json2)

        expect(response.status).toBe(401);
        done();
    });

    it('get the entire schedule of provider', async (done) => {
        const jsonString = {
            "quarta": [["08:00", "12:00"], ["14:00", "18:00"]],
            "quinta": [["08:00", "12:00"], ["14:00", "18:00"]], 
            "sabado": [["08:00", "12:00"]], 
            "segunda": [["08:00", "12:00"], ["14:00", "18:00"]], 
            "sexta": [["08:00", "12:00"], ["14:00", "18:00"]], 
            "terca": [["08:00", "12:00"], ["14:00", "18:00"]]
        }
        const response = await request(schedule_app)
        .get('/' + id_prestador)

        expect(response.status).toBe(200);
        expect(response.body).toEqual(jsonString);
        done();
    });

    it('should not get the entire schedule of provider with invalid id', async (done) => {
        const id_prestador = "dummy-two";
        
        const response = await request(schedule_app)
        .get('/' + id_prestador)

        expect(response.status).toBe(401);
        done();
    });

    it('should uptade a schedule provider with valid id', async (done) => {
        const json = {
            id_prestador: id_prestador,
            horario: {
                segunda: [["08:00", "12:00"], ["14:00", "18:00"]],
                terca:   [["08:00", "11:00"], ["14:00", "15:30"]],
                quarta:  [["08:00", "12:00"], ["14:00", "18:00"]],
                quinta:  [["08:00", "12:00"], ["14:00", "18:00"]],
                sexta:   [["08:00", "12:00"], ["14:00", "18:00"]],
                sabado:  [["08:00", "10:30"], ["08:00", "10:30"], ["13:10", "14:30"], ["16:00", "19:15"]],
                domingo: []
            }
        }
        
        const response = await request(schedule_app)
        .put('/')
        .send(json)

        expect(response.status).toBe(200);
        done();
    });

    it('should not be able to uptade a schedule provider without valid id', async (done) => {
        const json = {
            id_prestador: "dummy-three",
            horario: {
                segunda: [["08:00", "12:00"], ["14:00", "18:00"]],
                terca:   [["08:00", "11:00"], ["14:00", "15:30"]],
                quarta:  [["08:00", "12:00"], ["14:00", "18:00"]],
                quinta:  [["08:00", "12:00"], ["14:00", "18:00"]],
                sexta:   [["08:00", "12:00"], ["14:00", "18:00"]],
                sabado:  [["08:00", "10:30"], ["08:00", "10:30"], ["13:10", "14:30"], ["16:00", "19:15"]],
                domingo: []
            }
        }
        
        const response = await request(schedule_app)
        .put('/')
        .send(json)

        expect(response.status).toBe(406);
        done();
    });

    it('should delete a entire schedule provider', async (done) => {
        
        const response = await request(schedule_app)
        .delete('/' + id_prestador)

        expect(response.status).toBe(200);
        done();
    });

    it('should not be able to delete a entire schedule provider with invalid id', async (done) => {
        const id_prestador = "dummy-four";
        
        const response = await request(schedule_app)
        .get('/' + id_prestador)

        expect(response.status).toBe(401);
        done();
    }); 
});