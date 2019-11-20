const supertest = require('supertest');
const router_app = require('../src/router_app');
const request = supertest(router_app);

describe('Running Tests...', () =>{
    var event = new Date('August 19, 2019 23:15:30 UTC-3');

    const schedule.segunda = "08:00 - 18:00";
    
    it('create provider schedules', async(done) => {
        await request.post('/prestador/horario/')
        .send()
        .set('Acept', 'application/json')
        .expect('Content-type', /json/)
        .expect(201)
        .end(function(err, res) {
            if(err) return done(err);
            done();
        });
    });
});