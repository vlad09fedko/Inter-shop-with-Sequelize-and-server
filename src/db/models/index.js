import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { createRequire } from 'module';

import { Sequelize, DataTypes } from 'sequelize';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const require = createRequire(import.meta.url);

const sequelizeRc = require(
  path.resolve(process.cwd(), '.sequelizerc')
);

const configPath = path.resolve(process.cwd(), sequelizeRc.config);
const env = process.env.NODE_ENV || 'development';

let configModule;

if (configPath.endsWith('.json')) {
  configModule = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
} else {
  configModule = await import(pathToFileURL(configPath).href);
}

const config = (configModule.default ?? configModule)[env];

if (!config) {
  throw new Error(`Database configuration for "${env}" not found`);
}

const { use_env_variable, ...sequelizeOptions } = config;

const sequelize = use_env_variable
  ? new Sequelize(
      process.env[use_env_variable],
      sequelizeOptions
    )
  : new Sequelize(
      config.database,
      config.username,
      config.password,
      sequelizeOptions
    );

const db = {};

const files = fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== path.basename(__filename) &&
      file.endsWith('.js') &&
      !file.endsWith('.test.js')
    );
  });

for (const file of files) {
  const modelModule = await import(
    pathToFileURL(path.join(__dirname, file)).href
  );

  const Model = modelModule.default;

  if (!Model || typeof Model.init !== 'function') {
    throw new Error(`Invalid model export in file: ${file}`);
  }

  Model.init(sequelize, DataTypes);

  db[Model.name] = Model;
}

for (const model of Object.values(db)) {
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
