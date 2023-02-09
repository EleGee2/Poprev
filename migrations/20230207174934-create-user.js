'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV4
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "First name is required"},
          notEmpty: { msg: "First name is required"}
        }
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Last name is required"},
          notEmpty: { msg: "Last name is required"}
        }
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM({
          values: ["admin", "user"]
        }),
        defaultValue: "user"
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          return () => this.getDataValue("password")
        }
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      activated: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('users');
  }
};