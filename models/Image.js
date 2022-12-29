'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.Superhero, {
        foreignKey: 'heroId'
      });
    }
  }
  Image.init(
    {
      path: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          notNull: true
        }
      }
    },
    {
      sequelize,
      modelName: 'Image',
      tableName: 'images',
      underscored: true
    }
  );
  return Image;
};
