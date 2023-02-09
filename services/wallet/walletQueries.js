const { DataTypes } = require("sequelize");
const { sequelize } = require('../../models')
const Wallet = require("../../models/wallet")(sequelize, DataTypes)

const createWallet = async (values, trx) => {
    return (await Wallet.create({ ...values }, { transaction: trx})).toJSON()
}

const updateWallet = async (amount, query, trx) => {
    return (await Wallet.increment({ balance: amount},{where: {...query}, transaction: trx}))
}

const decrementWallet = async (amount, query, trx) => {
    return (await Wallet.decrement({ balance:amount }, { where: { ...query }}))
}

const getWalletByQuery = async (query) => {
    return (await Wallet.findOne({where: {...query}}))
}

module.exports = {
    createWallet,
    updateWallet,
    getWalletByQuery,
    decrementWallet
}