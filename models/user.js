const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ transactions, wallets}) {
      // define association here
      this.hasMany(transactions, { foreignKey: "userId"})
      this.hasMany(wallets, { foreignKey: "userId"})
    }

    toJSON() {
      return { ...this.get(), password: undefined}
    }
  }
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "First name is required"},
        notEmpty: { msg: "First name is required"}
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Last name is required"},
        notEmpty: { msg: "Last name is required"}
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING
    },
    activated: {
      type: DataTypes.BOOLEAN
    },
    type: {
      type: DataTypes.ENUM({
        values: ['admin', "user"]
      }),
      defaultValue: "user"
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return () => this.getDataValue("password")
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    token: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'users',
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return User;
};