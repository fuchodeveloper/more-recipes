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
    name: {
      type: Sequelize.STRING
    },
    favoriteCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    ingredients: {
      type: Sequelize.TEXT
    },
    direction: {
      type: Sequelize.TEXT
    },
    image: {
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
    recipeOwnerView: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }),
  down: queryInterface => queryInterface.dropTable('Recipes')
};
