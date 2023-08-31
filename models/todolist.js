'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todoList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      todoList.belongsTo(models.titleList, {
        foreignKey: 'titleList_id'
      })
    }
  }
  todoList.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    titleList_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'todoList',
  });
  return todoList;
};