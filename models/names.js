'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class names extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  names.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    date_added: DataTypes.DATE,
    password: DataTypes.STRING,
    confirm_password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'names',
  });
  return names;
};