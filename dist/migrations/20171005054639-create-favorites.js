'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Favorites', {
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
      recipeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Recipes',
          key: 'id',
          as: 'recipeId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function down(queryInterface) {
    return queryInterface.dropTable('Favorites');
  }
};