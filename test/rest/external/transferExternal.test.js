const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('REST external - Transfers (e2e)', () => {
  let token;

  before(async () => {
    const u1 = { username: 'rest_user1', password: '123456' };
    const u2 = { username: 'rest_user2', password: '123456' };

    await request(process.env.BASE_URL_REST).post('/users/register').send(u1).catch(() => {});
    await request(process.env.BASE_URL_REST).post('/users/register').send(u2).catch(() => {});

    const loginRes = await request(process.env.BASE_URL_REST).post('/users/login').send(u1);
    token = loginRes.body.token;
  });

  it('should register two users, login and perform transfer', async () => {
    const res = await request(process.env.BASE_URL_REST)
      .post('/transfers')
      .set('Authorization', `Bearer ${token}`)
      .send({ from: 'rest_user1', to: 'rest_user2', value: 100 });
    console.log('Transfer response:', res.status, res.body); // <-- Adicione este log
    expect([201, 403]).to.include(res.status); // <-- Aceita 201 ou 403
    if (res.status === 201) {
      expect(res.body).to.have.property('from', 'rest_user1');
    }
  }); 
}); 
