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
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Table({
  tableName: 'playlist_song',
  modelName: 'PlaylistSong',
  underscored: true,
})
export class PlaylistSong extends Model<PlaylistSong> {
  @Field()
  @ForeignKey(() => Playlist)
  @Column
  playlistId: number;

  @Field()
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
