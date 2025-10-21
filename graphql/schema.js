// graphql/schema.js
const { gql } = require('apollo-server-express');
const { users } = require('../model/userModel');
const { transfers } = require('../model/transferModel');

const typeDefs = gql`
  type User { username: String!, favorecidos: [String], saldo: Float }
  type Transfer { from: String, to: String, value: Float, date: String }
  type LoginPayload { token: String, user: User }
  type Query { users: [User], transfers: [Transfer] }
  type Mutation {
    registerUser(username: String!, password: String!, favorecidos: [String]): User
    loginUser(username: String!, password: String!): LoginPayload
    createTransfer(from: String!, to: String!, value: Float!): Transfer
  }
`;

const resolvers = {
  Query: {
    users: () => users.map(u => ({ username: u.username, favorecidos: u.favorecidos, saldo: u.saldo })),
    transfers: () => transfers,
  },
  Mutation: {
    registerUser: (_, { username, password, favorecidos }) => {
      if (users.find(u => u.username === username)) throw new Error('User already exists');
      const u = { username, password: password, favorecidos: favorecidos || [], saldo: 10000 }; // password not hashed here for demo/testing
      users.push(u);
      return { username: u.username, favorecidos: u.favorecidos, saldo: u.saldo };
    },
    loginUser: (_, { username, password }) => {
      const u = users.find(x => x.username === username);
      if (!u || u.password !== password) throw new Error('Invalid credentials');
      return { token: 'test-token-' + username, user: { username: u.username, favorecidos: u.favorecidos, saldo: u.saldo } };
    },
    createTransfer: (_, { from, to, value }) => {
      const s = users.find(u => u.username === from);
      const d = users.find(u => u.username === to);
      if (!s || !d) throw new Error('User not found');
      if (value > s.saldo) throw new Error('Insufficient funds');
      if (value > 5000 && !s.favorecidos.includes(to)) throw new Error('Only to favored accounts for > 5000');
      s.saldo -= value;
      d.saldo = (d.saldo || 10000) + value;
      const t = { from, to, value, date: new Date().toISOString() };
      transfers.push(t);
      return t;
    }
  }
};

module.exports = { typeDefs, resolvers };
