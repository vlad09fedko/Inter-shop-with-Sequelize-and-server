require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_PG_USER,
    password: process.env.DB_PG_PWD,
    database: process.env.DB_PG_NAME,
    host: process.env.DB_PG_HOST,
    dialect: 'postgres',
    migrationStorage: 'json',
    seederStorage: 'json',
  },
  test: {},
  production: {},
};
