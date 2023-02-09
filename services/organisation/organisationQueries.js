const { DataTypes, where} = require("sequelize");
const { sequelize } = require('../../models')
const Organisation = require("../../models/organisation")(sequelize, DataTypes)

const createOrganisation = async (values) => {
    return (await Organisation.create({...values})).toJSON()
}

const getOrganisationById = async (value) => {
    return (await Organisation.findByPk(value)).toJSON()
}

const getOrganisationByQuery = async (query) => {
    return Organisation.findOne({where: {...query}})
}

module.exports = {
    createOrganisation,
    getOrganisationById,
    getOrganisationByQuery
}