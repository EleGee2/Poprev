const express = require("express");
const app = express()

const UserRouter = require('./user')
const OrganisationRouter = require('./organisation')
const TokenRouter = require('./token')
const TransactionRouter = require("./transaction")

app.use("/api/users", UserRouter)
app.use("/api/organisations", OrganisationRouter)
app.use("/api/tokens", TokenRouter)
app.use("/api/transactions", TransactionRouter)

module.exports = app