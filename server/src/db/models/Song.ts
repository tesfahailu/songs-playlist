import {
  Table,
  Column,
  BelongsToMany,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { Playlist } from './Playlist';
import { PlaylistSong } from './PlaylistSong';

@Table({
  tableName: 'song',
  modelName: 'Song',
  underscored: true,
})
export class Song extends Model<Song> {
  @Column
  name: string;

  @Column
  artist: string;

  @Column
  album: string;

  @Column
  uri: string;

  @Column
  releaseDate: Date;

  @Column
  genre: string;

  @Column
  duration: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @BelongsToMany(() => Playlist, () => PlaylistSong)
  playlist: Playlist[];
}
