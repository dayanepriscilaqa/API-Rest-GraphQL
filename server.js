// server.js
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT_REST || process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor REST ouvindo em http://localhost:${PORT}`);
  });
}

module.exports = app;
