const { DataTypes } = require("sequelize");
const { sequelize } = require('../../models')
const Token = require("../../models/token")(sequelize, DataTypes)

const createToken = async (values) => {
    return (await Token.create({...values})).toJSON()
}

const getTokenById = async (value) => {
    return (await Token.findByPk(value)).toJSON()
}

const getTokenByQuery = async (query) => {
    return (await Token.findOne( {where: {...query}}))
}

const updateToken = async (volume, query, trx) => {
    await Token.increment({ total_raised: volume }, { where: { ...query}, transaction: trx})
}

module.exports = {
    createToken,
    getTokenById,
    getTokenByQuery,
    updateToken
}