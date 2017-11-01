export default (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER
    },
    recipeName: {
      type: DataTypes.STRING,
      trim: true
    },
    favoriteCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    ingredient: {
      type: DataTypes.STRING
    },
    recipeDirection: {
      type: DataTypes.TEXT
    },
    recipeImage: {
      type: DataTypes.TEXT
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    upVotes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    downVotes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  });

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Recipe.hasMany(models.Reviews, {
      foreignKey: 'recipeId',
      as: 'reviews'
    });

    Recipe.hasMany(models.Favorites, {
      foreignKey: 'recipeId',
      as: 'favorites'
    });

    Recipe.hasMany(models.Votes, {
      foreignKey: 'recipeId'
    });

    Recipe.hasMany(models.downvotes, {
      foreignKey: 'recipeId'
    });
  };
  return Recipe;
};
