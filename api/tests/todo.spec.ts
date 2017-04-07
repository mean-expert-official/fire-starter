var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('todo unit tests:', () => {
    it('Should create a todo instance', (done: Function) => {
        api.post('/todos').send({
            text: 'test',
            dueAt: 'Wed Feb 01 2017 01:58:33 GMT-0500 (COT)'
        }).expect(200, done);
    });
});
