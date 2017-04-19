var should = require('chai').should();
var supertest = require('supertest');
var api = supertest('http://localhost:3000/api');

describe('Account unit tests:', () => {
  it('Should create a Account instance', (done: Function) => {
    api.post('/accounts').send({}).expect(200, done);
  });
});
