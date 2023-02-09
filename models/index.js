const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");

const config = require("../config")[process.env.NODE_ENV || "development"]

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: "postgres",
    raw: true,
    port: config.port,
    seederStorage: process.env.SEEDER_STORAGE,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: true
  });
}

fs.readdirSync(__dirname)
  .filter(file => {
    return file !== "index.js";
  })
  .forEach(file => {
    // eslint-disable-next-line import/no-dynamic-require
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;