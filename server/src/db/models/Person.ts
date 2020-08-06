import {
  Model,
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsToMany,
} from 'sequelize-typescript';
import { PersonPlaylist } from './PersonPlaylist';
import { Playlist } from './Playlist';

@Table({
  tableName: 'person',
  modelName: 'Person',
  underscored: true,
})
export class Person extends Model<Person> {
  @Column({ primaryKey: true })
  userName: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  phoneNumber: string;

  @Column
  birthDate: Date;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @BelongsToMany(() => Playlist, () => PersonPlaylist)
  playlist: Playlist[];
}
