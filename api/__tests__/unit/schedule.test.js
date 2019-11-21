const supertest = require('supertest');
const router_app = require('../../src/router_app');
const request = supertest(router_app);

beforeAll(done => {
    console.log('before')
    done();
});
  
afterAll(done => {
    console.log('after')
    done();
});

describe('Running Tests...', () =>{
    it('create provider schedules', async() => {
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
        
        const response = await request.post('/prestador/horario')
        .send(JSON.stringify(json))
        
        expect(response.statusCode).toEqual(201);
    });
});