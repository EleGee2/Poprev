'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tokens', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          notNull: { msg: "Name is required"},
          notEmpty: { msg: "Name is required"}
        }
      },
      image: {
        type: Sequelize.STRING
      },
      symbol: {
        type: Sequelize.STRING,
        unique: true,
        validate: { min: 3}
      },
      raise_amount: {
        type: Sequelize.INTEGER
      },
      completed_raise: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      orgId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "organisations",
          key: "id"
        }
      },
      total_supply: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: { min: 0}
      },
      total_raised: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: { min: 0}
      },
      supply: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: { min: 0}
      },
      buy_price: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: { min: 0}
      },
      sell_price: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: { min: 0}
      },
      valuation: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    await queryInterface.dropTable('tokens');
  }
};