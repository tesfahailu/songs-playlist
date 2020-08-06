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
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
@Table({
  tableName: 'song',
  modelName: 'Song',
  underscored: true,
})
export class Song extends Model<Song> {
  @Column({ primaryKey: true })
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  @Column
  name?: string;

  @Field({ nullable: true })
  @Column
  artist?: string;

  @Field({ nullable: true })
  @Column
  album?: string;

  @Field({ nullable: true })
  @Column
  uri?: string;

  @Field({ nullable: true })
  @Column
  releaseDate?: Date;

  @Field({ nullable: true })
  @Column
  genre?: string;

  @Field({ nullable: true })
  @Column
  duration?: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @Field(() => [Playlist], { nullable: true })
  @BelongsToMany(() => Playlist, () => PlaylistSong)
  playlists?: Playlist[];
}
