import {
  Table,
  Model,
  ForeignKey,
  Column,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { Playlist } from './Playlist';
import { Song } from './Song';

@Table({
  tableName: 'playlist_song',
  modelName: 'PlaylistSong',
  underscored: true,
})
export class PlaylistSong extends Model<PlaylistSong> {
  @ForeignKey(() => Playlist)
  @Column
  playlistId: number;

  @ForeignKey(() => Song)
  @Column
  songId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
