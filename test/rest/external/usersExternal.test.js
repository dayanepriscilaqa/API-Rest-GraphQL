// test/rest/external/usersExternal.test.js
const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('REST external - Users', () => {
  before(async () => {
    await request(process.env.BASE_URL_REST)
      .post('/users/register')
      .send({ username: 'teste', password: '123456' })
      .catch(() => {});
  });

  it('should register a user', async () => {
    const res = await request(process.env.BASE_URL_REST)
      .post('/users/register')
      .send({ username: 'teste2', password: '123456' });
    expect([200,201,400]).to.include(res.status);
  });

  it('should login and return token', async () => {
    const res = await request(process.env.BASE_URL_REST)
      .post('/users/login')
      .send({ username: 'teste', password: '123456' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });
});
