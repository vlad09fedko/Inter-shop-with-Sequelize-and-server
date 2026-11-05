import Sequelize from 'sequelize';

import initModels from './init-models.js';
import configByEnv from '../../config/postgresConfig.js';

const env = process.env.NODE_ENV || 'development';
const config = configByEnv[env];

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

const db = initModels(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
