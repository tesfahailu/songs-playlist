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
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
@Table({
  tableName: 'playlist',
  modelName: 'Playlist',
  underscored: true,
})
export class Playlist extends Model<Playlist> {
  @Field(() => Int)
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Field({ nullable: false })
  @Column
  name: string;

  @Field({ nullable: true })
  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @Field(() => [Person], { nullable: true })
  @BelongsToMany(() => Person, () => PersonPlaylist)
  people?: Person[];

  @Field(() => [Song], { nullable: true })
  @BelongsToMany(() => Song, () => PlaylistSong)
  songs?: Song[];
}
