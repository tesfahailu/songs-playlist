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
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Table({
  tableName: 'person_playlist',
  modelName: 'PersonPlaylist',
  underscored: true,
})
export class PersonPlaylist extends Model<PersonPlaylist> {
  @Field()
  @ForeignKey(() => Person)
  @Column
  username: string;

  @Field()
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
