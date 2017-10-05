'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Votes = sequelize.define('Votes', {
    recipeId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    },
    upvotes: {
      type: DataTypes.STRING
    },
    downvotes: {
      type: DataTypes.STRING
    }
  });

  Votes.associate = function (models) {
    Votes.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Votes.belongsTo(models.Recipes, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Votes;
};