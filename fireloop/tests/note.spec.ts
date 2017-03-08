var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Note unit tests:', () => {
    it('Should create a Note instance', (done: Function) => {
        api.post('/notes').send({
            title: 'test',
            content: 'test'
        }).expect(200, done);
    });
});
