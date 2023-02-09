const dotenv = require('dotenv');
const { Sequelize } = require('sequelize')
// const { sequelize } = require('./models')

dotenv.config({ path: './config.env' });
const app = require("./app")
const config = require("./config")[process.env.NODE_ENV || "development"]
const log = config.log()

const sequelize = new Sequelize(config)

function connectToPostgres () {
  sequelize.authenticate().then(() => {
    log.info("Connection has been established successfully.")
  }).catch((error) => {
    log.error("Unable to connect to the database:", error);
    process.exit(1)
  })

  return sequelize
}
config.client = connectToPostgres()
// sequelize.drop({ force: true})
const port = process.env.PORT || 5000;
app.listen(port, () => {
  log.info(`Server listening on ${port}`);
})