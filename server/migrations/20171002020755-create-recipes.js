module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Recipes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    },
    recipeName: {
      type: Sequelize.STRING
    },
    ingredientQuantity: {
      type: Sequelize.STRING
    },
    ingredient: {
      type: Sequelize.STRING
    },
    recipeDirection: {
      type: Sequelize.TEXT
    },
    recipeImage: {
      type: Sequelize.TEXT
    },
    views: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    // userId: {
    //   type: Sequelize.INTEGER,
    //   onDelete: 'CASCADE',
    //   references: {
    //     model: 'User',
    //     key: 'id',
    //     as: 'userId'
    //   }
    // },
  }),
  down: queryInterface => queryInterface.dropTable('Recipes')
};
