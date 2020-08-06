import {
  Model,
  Table,
  Column,
  BelongsToMany,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { PlaylistSong } from './PlaylistSong';
import { Person } from './Person';
import { PersonPlaylist } from './PersonPlaylist';
import { Song } from './Song';

@Table({
  tableName: 'playlist',
  modelName: 'Playlist',
  underscored: true,
})
export class Playlist extends Model<Playlist> {
  @Column
  name: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @BelongsToMany(() => Person, () => PersonPlaylist)
  persons: Person[];

  @BelongsToMany(() => Song, () => PlaylistSong)
  songs: Song[];
}
