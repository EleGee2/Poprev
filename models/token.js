'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ organisations }) {
      // define association here
      this.belongsTo(organisations, { foreignKey: 'orgId' })
    }
  }
  token.init({
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
    image: {
      type: DataTypes.STRING
    },
    symbol: {
      type: DataTypes.STRING,
      unique: true,
      validate: { min: 3}
    },
    raise_amount: {
      type: DataTypes.INTEGER
    },
    completed_raise: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    orgId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    total_supply: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0}
    },
    total_raised: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0}
    },
    supply: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0}
    },
    buy_price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0 }
    },
    sell_price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0 }
    },
    valuation: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'tokens',
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return token;
};