'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pet.init({
    type: DataTypes.STRING(7),
    age: DataTypes.FLOAT(4,2),
    sex: DataTypes.STRING(3),
    color: DataTypes.STRING,
    name: DataTypes.STRING,
    coat: DataTypes.STRING,
    activity: DataTypes.SMALLINT,
    friendliness: DataTypes.BOOLEAN,
    image: DataTypes.ARRAY(DataTypes.STRING),
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Pet',
  });
  return Pet;
};
