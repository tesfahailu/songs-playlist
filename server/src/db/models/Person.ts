import {
  Model,
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsToMany,
  DataType,
} from 'sequelize-typescript';
import { PersonPlaylist } from './PersonPlaylist';
import { Playlist } from './Playlist';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Table({
  tableName: 'person',
  modelName: 'Person',
  underscored: true,
})
export class Person extends Model<Person> {
  @Field()
  @Column({ primaryKey: true })
  username: string;

  @Field({ nullable: true })
  @Column
  firstName?: string;

  @Field({ nullable: true })
  @Column
  lastName?: string;

  @Field({ nullable: true })
  @Column
  email?: string;

  @Column
  password: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  tokenVersion: number;

  @Field({ nullable: true })
  @Column
  phoneNumber?: string;

  @Field({ nullable: true })
  @Column
  birthDate?: Date;

  @Field({ nullable: true })
  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @Field(() => [Playlist], { nullable: true })
  @BelongsToMany(() => Playlist, () => PersonPlaylist)
  playlists?: Playlist[];
}
