const { DataTypes } = require("sequelize");
const { sequelize } = require('../../models')
const Transaction = require("../../models/transaction")(sequelize, DataTypes)

const createTransaction = async (values, trx) => {
    return (await Transaction.create({ ...values }, {transaction: trx})).toJSON()
}

const getTransactionByQuery = async (query, trx) => {
    return (await Transaction.findOne({where: {...query}}))
}

const getTransactionsByQuery = async (query) => {
    return (await Transaction.findAll({where: { ...query }}))
}

module.exports = {
    createTransaction,
    getTransactionByQuery,
    getTransactionsByQuery
}