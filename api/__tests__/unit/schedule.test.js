const request = require('supertest');
const app = require('../../src/apps/schedule_app');
const firebase = require('../../src/firebase_init');

beforeAll(done => {
    done();
});
  
afterAll(done => {
    firebase.database().ref().remove();
    done();
});

describe('Running Tests...', () =>{
    const json = {
        id_prestador: "ae4afa056514e6bba1c78e5da9e839f864b5a26d3e8aa5a3f3dd24ee0deb9e87",
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

    const jsonString = {
        "quarta": [["08:00", "12:00"], ["14:00", "18:00"]],
        "quinta": [["08:00", "12:00"], ["14:00", "18:00"]], 
        "sabado": [["08:00", "12:00"]], 
        "segunda": [["08:00", "12:00"], ["14:00", "18:00"]], 
        "sexta": [["08:00", "12:00"], ["14:00", "18:00"]], 
        "terca": [["08:00", "12:00"], ["14:00", "18:00"]]
    }
    it('create provider schedules', async (done) => {
        const response = await request(app)
        .post('/')
        .send(json)

        expect(response.status).toBe(201);
        done();
    });

    it('get the entire schedule of provider', async (done) => {
        const id_prestador = "ae4afa056514e6bba1c78e5da9e839f864b5a26d3e8aa5a3f3dd24ee0deb9e87";

        const response = await request(app)
        .get('/' + id_prestador)

        expect(response.status).toBe(200);
        expect(response.body).toEqual(jsonString);
        done();
    });
});