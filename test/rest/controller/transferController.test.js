// test/rest/controller/transferController.test.js
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');

const app = require('../../../app'); // deve exportar o express app
const transferService = require('../../../service/transferService');

const SECRET = process.env.JWT_SECRET || 'secretdemo';

describe('Transfer Controller (unit)', () => {
  let token;
  before(() => {
    token = jwt.sign({ username: 'unituser' }, SECRET, { expiresIn: '1h' });
  });
  afterEach(() => sinon.restore());

  it('Quando informo remetente e destinatário inexistentes recebo 400', async () => {
    sinon.stub(transferService, 'transfer').throws(new Error('Usuário remetente ou destinatário não encontrado'));
    const res = await request(app)
      .post('/transfers')
      .set('Authorization', `Bearer ${token}`)
      .send({ from: 'inexistente', to: 'outro', value: 100 });
    expect(res.status).to.equal(400);
  });

  it('Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () => {
    const fakeTransfer = { from: 'unituser', to: 'dest', value: 50, date: new Date().toISOString() };
    sinon.stub(transferService, 'transfer').returns(fakeTransfer);
    const res = await request(app)
      .post('/transfers')
      .set('Authorization', `Bearer ${token}`)
      .send({ from: 'unituser', to: 'dest', value: 50 });
    expect(res.status).to.equal(201);
    expect(res.body).to.deep.equal(fakeTransfer);
  });
});
