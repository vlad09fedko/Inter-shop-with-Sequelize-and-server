const http = require('http');

const app = require('./src/app.js');
const db = require('./src/db/models/index.js');

dotenv.config();

const PORT = process.env.SERVER_PORT || 5001;
const server = http.createServer(app);

const dbCheck = async () => {
  try {
    await db.sequelize.authenticate();
    console.log(
      `Connection with DB ${process.env.DB_PG_NAME} has been successfuly done!`,
    );
  } catch (error) {
    console.error('Cannot connect to DB:', error.message);
  }
};

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  dbCheck();
});
