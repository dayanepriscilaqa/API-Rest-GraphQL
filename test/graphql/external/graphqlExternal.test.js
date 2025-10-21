// test/graphql/external/graphqlExternal.test.js
const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('GraphQL external', () => {
  const endpoint = process.env.BASE_URL_GRAPHQL; // ex: http://localhost:4000/graphql

  it('should query users', async () => {
    const query = '{ users { username } }';
    const res = await request(endpoint).post('').send({ query });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('data');
    expect(res.body.data).to.have.property('users');
  });

  it('should register and login via GraphQL', async () => {
    const uname = `gtest_${Date.now()}`;

    // 1. Registrar novo usuário (mutation registerUser)
    const reg = `
      mutation {
        registerUser(username: "${uname}", password: "123456") {
          username
          saldo
        }
      }
    `;
    const regRes = await request(endpoint).post('').send({ query: reg });
    expect(regRes.status).to.equal(200);
    expect(regRes.body.data.registerUser).to.have.property('username', uname);

    // 2. Login com o usuário criado (mutation loginUser)
    const login = `
      mutation {
        loginUser(username: "${uname}", password: "123456") {
          token
          user {
            username
            saldo
          }
        }
      }
    `;
    const loginRes = await request(endpoint).post('').send({ query: login });
    expect(loginRes.status).to.equal(200);
    expect(loginRes.body.data.loginUser).to.have.property('token');
    expect(loginRes.body.data.loginUser.user).to.have.property('username', uname);
  });
});
