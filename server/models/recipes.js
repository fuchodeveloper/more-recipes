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
    name: {
      type: DataTypes.STRING,
      trim: true
    },
    favoriteCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    ingredients: {
      type: DataTypes.STRING
    },
    direction: {
      type: DataTypes.TEXT
    },
    image: {
      type: DataTypes.STRING
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
    },
    recipeOwnerView: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  });

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Recipe.hasMany(models.Reviews, {
      foreignKey: 'recipeId'
    });

    Recipe.hasMany(models.Favorites, {
      foreignKey: 'recipeId',
      as: 'favorites'
    });

    Recipe.hasMany(models.Votes, {
      foreignKey: 'recipeId'
    });
  };
  return Recipe;
};
