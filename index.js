import http from 'http';

import app from './src/app.js';
import db from './src/db/models/index.js';

const PORT = process.env.SERVER_PORT || 5001;
const server = http.createServer(app);

async function checkDbConnection() {
  try {
    await db.sequelize.authenticate();
    return true;
  } catch (error) {
    console.error('Cannot connect to db:', error.message);
    return false;
  }
}

async function startServer() {
  try {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Cannot start server:', error.message);
  }
}

if (checkDbConnection()) {
  startServer();
}
