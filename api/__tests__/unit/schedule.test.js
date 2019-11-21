const request = require('supertest');
const app = require('../../src/apps/schedule_app');

beforeAll(done => {
    done();
});
  
afterAll(done => {
    done();
});

describe('Running Tests...', () =>{
    const json = {
        id_prestador: "36ec71c245a2f9ad45c6c76aef507eff8b556b6063deef6fe7ceec353a5271a7",
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
    it('create provider schedules', async (done) => {
        const response = await request(app)
        .post('/')
        .send(json)

        expect(response.status).toBe(201);
        done();
    });

    it('get the entire schedule of provider', async () => {
        const id_prestador = "36ec71c245a2f9ad45c6c76aef507eff8b556b6063deef6fe7ceec353a5271a7";

        const response = await request(app)
        .get('/' + id_prestador)

        expect(response.status).toBe(200);
        expect(response.body).toBe(json);

    });
});