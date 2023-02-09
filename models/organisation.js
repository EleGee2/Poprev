'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organisation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({tokens, transactions}) {
      // define association here
      this.hasMany(tokens, { foreignKey: "orgId"})
      this.hasMany(transactions, { foreignKey: "orgId"})
    }

    toJSON() {
      return { ...this.get(), password: undefined}
    }
  }
  Organisation.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
        validate: {
          notNull: { msg: "Name is required"},
          notEmpty: { msg: "Name is required"}
        }
      },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    activated: {
      type: DataTypes.BOOLEAN
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    twitter: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    instagram: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM({
        values: ['label', "artist"]
      })
    },
    entity_type: {
      type: DataTypes.STRING,
      defaultValue: "organisation"
    },
    address: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return () => this.getDataValue("password")
      }
    },
    token: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'organisations',
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return Organisation;
};