'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('person', {
      username: {
        primaryKey: true,
        autoIncrement: false,
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      token_version: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      birth_date: {
        type: Sequelize.DATE,
        allowNull: true,
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
    return queryInterface.dropTable('person');
  },
};
