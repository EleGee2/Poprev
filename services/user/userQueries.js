const { DataTypes } = require("sequelize");
const { sequelize } = require('../../models')
const User = require("../../models/user")(sequelize, DataTypes)

const createUser = async (values) => {
    return (await User.create({...values})).toJSON()
}

const getUserById = async (value) => {
    return (await User.findByPk(value)).toJSON()
}

const getUserByQuery = async (query) => {
    return (await User.findOne({where: {...query}}))
}

module.exports = {
    createUser,
    getUserById,
    getUserByQuery
}