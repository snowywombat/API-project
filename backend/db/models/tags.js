'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations....
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tag.belongsTo(models.Spot, { foreignKey: 'spotId' })
      Tag.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Tag.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false

    },
    tagName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
            len: [1, 20]
        }
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};
