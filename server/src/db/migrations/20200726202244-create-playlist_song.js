'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('playlist_song', {
      playlist_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'playlist',
          key: 'id',
        },
        allowNull: false,
        unique: false,
      },
      song_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'song',
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
    return queryInterface.dropTable('playlist_song');
  },
};
