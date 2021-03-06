export default (sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
    recipeId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    },
    upvotes: {
      type: DataTypes.BOOLEAN
    },
    downvotes: {
      type: DataTypes.BOOLEAN
    }
  });

  Votes.associate = (models) => {
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
