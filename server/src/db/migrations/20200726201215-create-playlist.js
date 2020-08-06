'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('playlist', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        unique: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('playlist');
  },
};
