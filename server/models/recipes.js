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
    ingredientQuantity: {
      type: DataTypes.STRING
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
    }
  });

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId'
    });

    // Recipe.hasMany(models.Reviews, {
    //   foreignKey: 'recipeId'
    // });
  };
  return Recipe;
};
