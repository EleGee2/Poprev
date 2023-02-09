'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('wallets', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        }
      },
      tokenId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "tokens",
          key: "id"
        }
      },
      balance: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        get() {
          const balance = this.getDataValue('balance')
          return (balance / 100).toFixed(2)
        },
        set(value) {
          this.setDataValue("balance", (value * 100))
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('wallets');
  }
};