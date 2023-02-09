'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ users, organisations, tokens }) {
      // define association here
      this.belongsTo(organisations, { foreignKey: "organisationId"})
      this.belongsTo(users, { foreignKey: "userId" })
      this.belongsTo(tokens, { foreignKey: "tokenId" })
    }
  }
  transaction.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    organisationId:{
      type: DataTypes.UUID,
      allowNull: true
    },
    tokenId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    reference: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.ENUM({
        values: ["Buy", "Sell", "Send", "Receive"]
      })
    },
    from: {
      type: DataTypes.UUID
    },
    to: {
      type: DataTypes.UUID
    },
    volume: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.ENUM({
        values: ["Pending", "Completed"]
      })
    },
    owner_model: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'transactions',
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return transaction;
};