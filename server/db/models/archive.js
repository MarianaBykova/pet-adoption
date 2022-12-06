'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Archive extends Model {

    static associate(models) {
    }
  }
  Archive.init({
    name: DataTypes.STRING,
    age: DataTypes.FLOAT(4,2),
    image: DataTypes.TEXT,
    text: DataTypes.STRING,
    hasHistory: DataTypes.BOOLEAN,
    history: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Archive',
  });
  return Archive;
};
