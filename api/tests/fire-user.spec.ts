var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('FireUser unit tests:', () => {
    it('Should create a FireUser instance', (done: Function) => {
        api.post('/fire-users').send({}).expect(200, done);
    });
});
