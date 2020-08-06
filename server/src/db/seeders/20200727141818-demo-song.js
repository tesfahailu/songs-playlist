'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('song', [
      {
        name: 'Anything u want',
        artist: 'TI',
        album: 'on the map',
        uri: 'sdadl;fiasdjfialsjdfaifdadf',
        release_date: new Date(Date.now())
          .toISOString()
          .replace('T', ' ')
          .replace('Z', ''),
        genre: 'rap',
        duration: 254454,
        created_at: new Date(Date.now())
          .toISOString()
          .replace('T', ' ')
          .replace('Z', ''),
        updated_at: new Date(Date.now())
          .toISOString()
          .replace('T', ' ')
          .replace('Z', ''),
      },
      {
        name: 'Michael Jackson',
        artist: 'Criminal',
        album: 'green',
        uri: 'sdadl;fiasdjfialsjdfaifdadf',
        release_date: new Date(Date.now())
          .toISOString()
          .replace('T', ' ')
          .replace('Z', ''),
        genre: 'rap',
        duration: 254454,
        created_at: new Date(Date.now())
          .toISOString()
          .replace('T', ' ')
          .replace('Z', ''),
        updated_at: new Date(Date.now())
          .toISOString()
          .replace('T', ' ')
          .replace('Z', ''),
      },
      {
        name: 'HULU',
        artist: 'Disney',
        album: 'kids pop',
        uri: 'sdadl;fiasdjfialsjdfaifdadf',
        release_date: new Date(Date.now())
          .toISOString()
          .replace('T', ' ')
          .replace('Z', ''),
        genre: 'rap',
        duration: 254454,
        created_at: new Date(Date.now())
          .toISOString()
          .replace('T', ' ')
          .replace('Z', ''),
        updated_at: new Date(Date.now())
          .toISOString()
          .replace('T', ' ')
          .replace('Z', ''),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('song', null, {});
  },
};
