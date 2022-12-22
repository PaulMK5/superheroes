'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superheroes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Superheroes.init(
    {
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true
        }
      },
      realName: {
        field: 'real_name',
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true
        }
      },
      originDesc: {
        field: 'origin_desc',
        type: DataTypes.TEXT
      },
      catchPhrase: {
        field: 'catch_phrase',
        type: DataTypes.TEXT
      }
    },
    {
      sequelize,
      modelName: 'Superhero',
      tableName: 'superheroes',
      underscored: true
    }
  );
  return Superheroes;
};
