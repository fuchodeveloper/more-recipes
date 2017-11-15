module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Recipes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    },
    recipeName: {
      type: Sequelize.STRING
    },
    favoriteCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    ingredient: {
      type: Sequelize.TEXT
    },
    recipeDirection: {
      type: Sequelize.TEXT
    },
    recipeImage: {
      type: Sequelize.STRING
    },
    views: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    upVotes: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    downVotes: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    recipe_owner_view: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }),
  down: queryInterface => queryInterface.dropTable('Recipes')
};
