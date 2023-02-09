'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ users, tokens}) {
      // define association here
      this.belongsTo(users, { foreignKey: "userId" })
      this.belongsTo(tokens, { foreignKey: "tokenId" })
    }
  }
  wallet.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    tokenId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      get() {
        const balance = this.getDataValue('balance')
        return (balance / 100).toFixed(2)
      },
      set(value) {
        this.setDataValue("balance", (value * 100))
      }
    }
  }, {
    sequelize,
    modelName: 'wallets',
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return wallet;
};