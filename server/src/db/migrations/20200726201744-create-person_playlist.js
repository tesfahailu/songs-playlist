'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('person_playlist', {
      username: {
        type: Sequelize.STRING,
        references: {
          model: 'person',
          key: 'username',
        },
        allowNull: false,
        unique: false,
      },
      playlist_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'playlist',
          key: 'id',
        },
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
    return queryInterface.dropTable('person_playlist');
  },
};
