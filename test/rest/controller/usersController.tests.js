// test/rest/controller/usersController.test.js
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');

const app = require('../../../app');
const userService = require('../../../service/userService');

const SECRET = process.env.JWT_SECRET || 'secretdemo';

describe('Users Controller (unit)', () => {

  afterEach(() => {
    sinon.restore(); // limpa mocks a cada teste
  });

  it('deve retornar 400 se username ou password faltarem no registro', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({ username: 'usuarioSemSenha' });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('deve registrar um usuário com sucesso (mockado)', async () => {
    const fakeUser = { username: 'teste', saldo: 100, favorecidos: [] };
    sinon.stub(userService, 'registerUser').returns(fakeUser);

    const res = await request(app)
      .post('/users/register')
      .send({ username: 'teste', password: '123456' });

    expect(res.status).to.equal(201);
    expect(res.body).to.deep.equal(fakeUser);
  });

  it('deve retornar 400 se autenticação falhar no login', async () => {
    sinon.stub(userService, 'authenticateUser').throws(new Error('Usuário ou senha inválidos'));

    const res = await request(app)
      .post('/users/login')
      .send({ username: 'teste', password: 'errada' });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error', 'Usuário ou senha inválidos');
  });

  it('deve logar com sucesso e retornar token', async () => {
    const fakeUser = { username: 'teste', saldo: 200, favorecidos: [] };
    sinon.stub(userService, 'authenticateUser').returns(fakeUser);

    const res = await request(app)
      .post('/users/login')
      .send({ username: 'teste', password: '123456' });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    const decoded = jwt.verify(res.body.token, SECRET);
    expect(decoded).to.have.property('username', 'teste');
  });
});
