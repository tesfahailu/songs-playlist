import {
  Model,
  Table,
  Column,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { Person } from './Person';
import { Playlist } from './Playlist';

@Table({
  tableName: 'person_playlist',
  modelName: 'PersonPlaylist',
  underscored: true,
})
export class PersonPlaylist extends Model<PersonPlaylist> {
  @ForeignKey(() => Person)
  @Column
  userName: string;

  @ForeignKey(() => Playlist)
  @Column
  playlistId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
