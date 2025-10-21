// server-graphql.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./graphql/schema');
const { resolvers } = require('./graphql/resolvers');
require('dotenv').config();

const app = express();

// Configuração do Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' }); // Endpoint GraphQL em /graphql
}

startServer().catch(err => console.error('Erro ao iniciar o servidor GraphQL:', err));

const PORT = process.env.PORT_GRAPHQL || 4000;
app.listen(PORT, () => {
  console.log(`Servidor GraphQL ouvindo em http://localhost:${PORT}/graphql`);
});