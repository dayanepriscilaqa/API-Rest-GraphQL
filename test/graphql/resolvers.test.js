// test/graphql/resolvers.test.js
const { expect } = require('chai');
const resolvers = require('../../graphql/resolvers'); // ajuste o caminho se necessário

describe('GraphQL resolvers (unit)', () => {
  it('users resolver should return array', async () => {
    // Ajuste se seu resolver espera args/context diferentes
    const result = await resolvers.Query.users(null, {}, {});
    expect(result).to.be.an('array');
  });
});
