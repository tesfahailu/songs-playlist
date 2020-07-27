import { Playlist } from './models/Playlist';
import { Person } from './models/Person';
import { Sequelize } from 'sequelize-typescript';
import { PersonPlaylist } from './models/PersonPlaylist';
import { PlaylistSong } from './models/PlaylistSong';
import { Song } from './models/Song';

export default async () => {
  const sequelize = await new Sequelize(process.env.SQL_CONNECTION_URL || '', {
    define: {
      timestamps: false,
    },
    dialect: 'postgres',
    models: [Person, PersonPlaylist, Playlist, PlaylistSong, Song],
  });

  sequelize
    .authenticate()
    .then(async () => {
      console.log('Data base connected successfully');
    })
    .catch((err: any) => console.log('Error', err));

  return sequelize;
};
