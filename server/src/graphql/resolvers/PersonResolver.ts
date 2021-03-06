import { PlaylistSong } from './../../db/models/PlaylistSong';
import { PersonPlaylist } from './../../db/models/PersonPlaylist';
import { Song } from './../../db/models/Song';
import {
  Resolver,
  Query,
  Arg,
  ArgsType,
  Field,
  Mutation,
  Args,
  ObjectType,
} from 'type-graphql';
import { Person } from './../../db/models/Person';
import { Playlist } from './../../db/models/Playlist';

@ArgsType()
class PersonArg {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  birthDate?: Date;
}

@ObjectType()
class DeletePersonResponse {
  @Field()
  success: Boolean;
}

@Resolver()
export class PersonResolver {
  @Query(() => Person)
  async person(@Arg('username') username: string): Promise<Person | null> {
    try {
      return await Person.findOne({
        where: { username },
        include: [{ model: Playlist, include: [{ model: Song }] }],
      });
    } catch (err) {
      throw new Error('user name is invalid');
    }
  }

  @Query(() => [Person])
  async people(): Promise<Person[] | null> {
    return await Person.findAll({
      include: [
        {
          model: Playlist,
          include: [Person, Song],
        },
      ],
    });
  }

  @Mutation(() => Person)
  async createPerson(
    @Args()
    {
      username,
      password,
      firstName,
      lastName,
      email,
      phoneNumber,
      birthDate,
    }: PersonArg,
  ): Promise<Person | null> {
    const person = await Person.findOne({ where: { username } });
    if (person) throw new Error('user name is already used');

    try {
      return await Person.create({
        username,
        password,
        firstName,
        lastName,
        email,
        phoneNumber,
        birthDate,
      });
    } catch (err) {
      throw new Error('could not create user');
    }
  }

  @Mutation(() => Person)
  async updatePerson(
    @Args()
    {
      username,
      password,
      firstName,
      lastName,
      email,
      phoneNumber,
      birthDate,
    }: PersonArg,
  ): Promise<Person | null> {
    const person = Person.findOne({ where: { username } });
    if (!person) throw new Error('user name does not exist');

    try {
      return (await Person.update(
        {
          username,
          password,
          firstName,
          lastName,
          email,
          phoneNumber,
          birthDate,
        },
        {
          where: {
            username,
          },
        },
      )) as any;
    } catch (err) {
      throw new Error('could not update user');
    }
  }

  @Mutation(() => DeletePersonResponse)
  async deletePerson(
    @Arg('username') username: string,
  ): Promise<DeletePersonResponse> {
    const person = await Person.findOne({
      where: { username },
      include: [{ model: Playlist, include: [{ model: Song }] }],
    });
    if (!person) throw new Error('user does not exist');

    const playlists = person.playlists;
    if (Array.isArray(playlists) && playlists.length > 0) {
      await Promise.all(
        playlists.map((playlist) => {
          if (playlist.people && playlist.people.length === 1) {
            PlaylistSong.destroy({
              where: { playlistId: playlist.id },
            });
            Playlist.destroy({
              where: {
                id: playlist.id,
              },
            });
          }
          PersonPlaylist.destroy({
            where: {
              username,
              playlistId: playlist.id,
            },
          });
        }),
      ).catch((err) => {
        new Error(err);
        return { success: false };
      });
    }

    try {
      Person.destroy({ where: { username } });
    } catch (err) {
      throw new Error('could not remove user');
    }

    return { success: true };
  }
}
