export default (sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
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
  return Votes;
};
