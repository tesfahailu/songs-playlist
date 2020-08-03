<<<<<<< Updated upstream
=======
import { PersonPlaylist } from './../../db/models/PersonPlaylist';
import { Song } from './../../db/models/Song';
>>>>>>> Stashed changes
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

@ArgsType()
class CreatePersonArg {
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
<<<<<<< Updated upstream
    return await Person.findOne({ where: { userName } });
=======
    try {
      return await Person.findOne({
        where: { userName },
        include: [{ model: Playlist, include: [{ model: Song }] }],
      });
    } catch (err) {
      console.log(err);
      throw new Error('user name is invalid');
    }
>>>>>>> Stashed changes
  }

  @Query(() => [Person])
  async people(): Promise<Person[] | null> {
<<<<<<< Updated upstream
    return await Person.findAll();
=======
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    }: CreatePersonArg,
  ): Promise<Person | null> {
=======
    }: PersonArg,
  ): Promise<Person | null> {
    const person = await Person.findOne({ where: { userName } });
    if (person) throw new Error('user name is already used');

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    }: CreatePersonArg,
  ): Promise<Person | null> {
=======
    }: PersonArg,
  ): Promise<Person | null> {
    const person = Person.findOne({ where: { userName } });
    if (!person) throw new Error('user name does not exist');
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    const person = await Person.findOne({ where: { userName } });
    if (!person) throw new Error('user does not exist');

    try {
      await Person.destroy({ where: { userName } });
    } catch (err) {
      console.log(err);
      return { success: false };
    }
    return { success: true };
=======
    const person = await Person.findOne({
      where: { userName },
      include: [{ model: Playlist, include: [{ model: Song }] }],
    });
    if (!person) throw new Error('user does not exist');

    const playlists = person.playlists;
    if (Array.isArray(playlists) && playlists.length > 0) {
      playlists.map((playlist) => {
        if (playlist.people && playlist.people.length > 1) {
          PersonPlaylist.destroy({
            where: {
              userName,
              playlistId: playlist.id,
            },
          });
        } else {
          Playlist.destroy({
            where: {
              id: playlist.id,
            },
          });
        }
      });
      return { success: true };
    }

    // try {
    //   await Person.destroy({ where: { userName } });
    // } catch (err) {
    //   console.log(err);
    //   return { success: false };
    // }
    return { success: false };
>>>>>>> Stashed changes
  }
}
