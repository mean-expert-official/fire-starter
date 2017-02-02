var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Organization unit tests:', () => {
    it('Should create a Organization instance', (done: Function) => {
        api.post('/organizations').send({}).expect(200, done);
    });
});
