'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rides', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" }
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
      },
      speed: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      travelType: {
        allowNull: false,
        type: Sequelize.STRING(50)
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Rides');
  }
};
