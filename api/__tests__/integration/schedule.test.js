const request = require('supertest');
const schedule_app = require('../../src/apps/schedule_app');
const user_app = require('../../src/apps/user_app');
const provider_app = require('../../src/apps/provider_app');

const firebase = require('../../src/firebase_init');

describe('Running Tests...', () =>{
    var id_prestador = null;
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

});