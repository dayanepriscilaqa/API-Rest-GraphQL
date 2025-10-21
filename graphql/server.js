// graphql/server.js
require('dotenv').config();
const { app, serverReady } = require('./app');

const PORT = process.env.PORT_GRAPHQL || 4000;
(async () => {
  await serverReady;
  app.listen(PORT, () => {
    console.log(`Servidor GraphQL ouvindo em http://localhost:${PORT}/graphql`);
  });
})();
