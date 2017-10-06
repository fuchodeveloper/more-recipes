'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var downvotes = sequelize.define('downvotes', {
    recipeId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    },
    downVotes: {
      type: DataTypes.STRING,
      defaultValue: 0
    }
  });

  downvotes.associate = function (models) {
    downvotes.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    downvotes.belongsTo(models.Recipes, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return downvotes;
};