'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate({User}) {
      this.belongsTo(User, {foreignKey: 'userId'})
    }
  }
  Token.init({
    userId: DataTypes.INTEGER,
    refreshToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};
