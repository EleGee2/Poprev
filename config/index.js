const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const bunyan = require('bunyan');
const pjs = require('../package.json');
const { name, version } = pjs;

const getLogger = (serviceName, serviceVersion, level) => bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });

module.exports = {
  development : {
    // name,
    // version,
    // serviceTimeout: 30,
    // postgres: {
    //   options: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        logging: msg => getLogger(name, version, 'debug').info(msg),
    //   },
      client: null,
    // },
    log: () => getLogger(name, version, 'debug'),
  },
  "production" : {
    name,
    version,
    serviceTimeout: 30,
    postgres: {
      options: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE_NAME,
        host: process.env.HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        logging: msg => getLogger(name, version, 'debug').info(msg)
      },
      client: null
    },
    log: () => getLogger(name, version, 'info'),
  }
}