export default (sequelize, DataTypes) => {
  const downvotes = sequelize.define('downvotes', {
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

  downvotes.associate = (models) => {
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
