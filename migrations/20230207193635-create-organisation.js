'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('organisations', {
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
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      twitter: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      activated: {
        type: Sequelize.BOOLEAN
      },
      instagram: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM({
          values: ['label', "artist"]
        })
      },
      entity_type: {
        type: Sequelize.STRING,
        defaultValue: "organisation"
      },
      address: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          return () => this.getDataValue("password")
        }
      },
      token: {
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
    await queryInterface.dropTable('organisations');
  }
};