'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "users",
          key: "id"
        }
      },
      organisationId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "organisations",
          key: "id"
        }
      },
      tokenId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "tokens",
          key: "id"
        }
      },
      reference: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM({
          values: ["Buy", "Sell", "Send", "Receive"]
        })
      },
      from: {
        type: Sequelize.UUID
      },
      to: {
        type: Sequelize.UUID
      },
      volume: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM({
          values: ["Pending", "Completed"]
        })
      },
      owner_model: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('transactions');
  }
};