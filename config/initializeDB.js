const Sequelize = require('sequelize');

const configOptions = require('./config.json');
const modelList = require('../models/index.js');

const { DataTypes } = Sequelize;

const env = 'development';
const config = configOptions[env];

let sequelizeDB;
// if (config.use_env_variable) {
//   sequelizeDB = new Sequelize(process.env[config.use_env_variable], config);
// } else {
  sequelizeDB = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
// }

const db = Object.keys(modelList).reduce((collection, modelName) => {
  if (!collection[modelName]) {
    collection[modelName] = modelList[modelName](sequelizeDB, DataTypes);
  }
  return collection;
}, {});

Object.keys(db).forEach((modelName) => {
    // console.log(modelName)
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelizeDB = sequelizeDB;
db.Sequelize = Sequelize;

module.exports = db;