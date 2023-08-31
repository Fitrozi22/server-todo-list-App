'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.titleList, {
        foreignKey: 'user_id'
      })
    }
  }
  user.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  },{
    hooks: {
      beforeCreate: (user, options) => {
        let plainPassword = user.password;
        const hashPassword = bcrypt.hashSync(plainPassword, salt);
        user.password = hashPassword;
      },
      beforeUpdate: (user, options) => {
        let plainPassword = user.password;
        const hashPassword = bcrypt.hashSync(plainPassword, salt);
        user.password = hashPassword;
      } 
    }
  },
  sequelize,
  );
  return user;
};