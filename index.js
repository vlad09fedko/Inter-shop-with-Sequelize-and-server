import http from 'http';

import app from './src/app.js';
import db from './src/db/models/index.js';

const PORT = process.env.SERVER_PORT || 5001;
const server = http.createServer(app);

const startServer = async () => {
  try {
    await db.sequelize.authenticate();

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Cannot start server:', error.message);
  }
}; //////////////// ?

startServer();
