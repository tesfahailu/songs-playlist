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
  userName: string;

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
  async person(@Arg('userName') userName: string): Promise<Person | null> {
    try {
      return await Person.findOne({
        where: { userName },
        include: [{ model: Playlist, include: [{ model: Song }] }],
      });
    } catch (err) {
      console.log(err);
      throw new Error('user name is invalid');
    }
  }

  @Query(() => [Person])
  async people(): Promise<Person[] | null> {
    try {
      return await Person.findAll({
        include: [
          {
            model: Playlist,
            include: [Person, Song],
          },
        ],
      });
    } catch (err) {
      console.log(err);
      throw new Error('could not find users');
    }
  }

  @Mutation(() => Person)
  async createPerson(
    @Args()
    {
      userName,
      password,
      firstName,
      lastName,
      email,
      phoneNumber,
      birthDate,
    }: PersonArg,
  ): Promise<Person | null> {
    const person = await Person.findOne({ where: { userName } });
    if (person) throw new Error('user name is already used');

    return await Person.create({
      userName,
      password,
      firstName,
      lastName,
      email,
      phoneNumber,
      birthDate,
    });
  }

  @Mutation(() => Person)
  async updatePerson(
    @Args()
    {
      userName,
      password,
      firstName,
      lastName,
      email,
      phoneNumber,
      birthDate,
    }: PersonArg,
  ): Promise<Person | null> {
    const person = Person.findOne({ where: { userName } });
    if (!person) throw new Error('user name does not exist');
    return (await Person.update(
      {
        userName,
        password,
        firstName,
        lastName,
        email,
        phoneNumber,
        birthDate,
      },
      {
        where: {
          userName,
        },
      },
    )) as any;
  }

  @Mutation(() => DeletePersonResponse)
  async deletePerson(
    @Arg('userName') userName: string,
  ): Promise<DeletePersonResponse> {
    const person = await Person.findOne({
      where: { userName },
      include: [{ model: Playlist, include: [{ model: Song }] }],
    });
    if (!person) throw new Error('user does not exist');

    const playlists = person.playlists;
    if (Array.isArray(playlists) && playlists.length > 0) {
      playlists.map(async (playlist) => {
        if (playlist.people && playlist.people.length > 1) {
          await PersonPlaylist.destroy({
            where: {
              userName,
              playlistId: playlist.id,
            },
          });
        } else {
          playlist.songs &&
            playlist.songs.map(async (song) => {
              await PlaylistSong.destroy({
                where: { songId: song.id, playlistId: playlist.id },
              });
            });
          await Playlist.destroy({
            where: {
              id: playlist.id,
            },
          });
          await PersonPlaylist.destroy({
            where: {
              userName,
              playlistId: playlist.id,
            },
          });
        }
      });
      Person.destroy({ where: { userName } });
      return { success: true };
    }

    // try {
    //   await Person.destroy({ where: { userName } });
    // } catch (err) {
    //   console.log(err);
    //   return { success: false };
    // }
    return { success: false };
  }
}
