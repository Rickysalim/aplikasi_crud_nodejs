"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static #encrypt = function (password) {
      return bcrypt.hashSync(password, 10);
    };
    static register = function ({ email, password, role}) {
      const encryptedpassword = this.#encrypt(password);
      return this.create({ email, password: encryptedpassword, role});
    };
    checkPassword = (password) => {
      return bcrypt.compareSync(password, this.password);
    };
    static authenticate = async ({ email, password }) => {
      try {
        const user = await this.findOne({ 
          where: { email }
        });
        if (!user) {
          return Promise.reject("Invalid Username And Password");
        }
        if (!user.checkPassword(password)) {
          return Promise.reject("Invalid Username And Password");
        }
        return Promise.resolve(user);
      } catch (err) {
        return Promise.reject(err);
      }
    };
    generateToken = () => {
      const payload = {
        id: this.id,
        email: this.email,
        password: this.password,
        role: this.role,
      };
      const secret = "rahasia";
      return jwt.sign(payload, secret);
    };
  }
  users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
