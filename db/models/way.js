'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Way extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Way.belongsTo(models.User, { 
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      }),
      Way.hasMany(models.Comment, {
        foreignKey: 'way_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Way.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Way',
  });
  return Way;
};
