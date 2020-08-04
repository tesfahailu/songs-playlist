import { PlaylistSong } from './../../db/models/PlaylistSong';
import { Playlist } from './../../db/models/Playlist';
import { Song } from './../../db/models/Song';
import {
  Resolver,
  Arg,
  Query,
  Mutation,
  ArgsType,
  ObjectType,
  Field,
  Args,
} from 'type-graphql';
import { Person } from './../../db/models/Person';

@ObjectType()
class DeleteSongResponse {
  @Field()
  success: Boolean;
}

@ArgsType()
class SongArgs {
  @Field()
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  artist?: string;

  @Field({ nullable: true })
  album?: string;

  @Field({ nullable: true })
  uri?: string;

  @Field({ nullable: true })
  releaseDate?: Date;

  @Field({ nullable: true })
  genre?: string;

  @Field({ nullable: true })
  duration?: string;
}

@Resolver()
export class SongResolver {
  @Query(() => Song)
  async song(@Arg('id') id: number): Promise<Song | null> {
    try {
      return await Song.findOne({
        where: { id },
        include: [
          {
            model: Playlist,
            include: [
              {
                model: Person,
              },
            ],
          },
        ],
      });
    } catch (err) {
      console.log(err);
      throw new Error('song id is invalid');
    }
  }

  @Query(() => [Song])
  async songs(): Promise<Song[] | null> {
    try {
      return await Song.findAll({
        include: [
          {
            model: Playlist,
            include: [
              {
                model: Person,
              },
            ],
          },
        ],
      });
    } catch (err) {
      console.log(err);
      throw new Error('could not find songs');
    }
  }

  @Mutation(() => Song)
  async createSong(
    @Args()
    { name, artist, album, uri, releaseDate, genre, duration }: SongArgs,
  ): Promise<Song | null> {
    try {
      return await Song.create({
        name,
        artist,
        album,
        uri,
        releaseDate,
        genre,
        duration,
      });
    } catch (err) {
      console.log(err);
      throw new Error('could not create song');
    }
  }

  @Mutation(() => Song)
  async updateSong(
    @Args()
    { id, name, artist, album, uri, releaseDate, genre, duration }: SongArgs,
  ): Promise<Song | null> {
    try {
      return (await Song.update(
        { name, artist, album, uri, releaseDate, genre, duration },
        { where: { id } },
      )) as any;
    } catch (err) {
      console.log(err);
      throw new Error('could not update song');
    }
  }

  @Mutation(() => DeleteSongResponse)
  async deleteSong(@Arg('id') id: string): Promise<DeleteSongResponse> {
    const song = Song.findOne({ where: { id } });
    if (!song) throw new Error('song was not found');

    try {
      await Song.destroy({ where: { id } });
      await PlaylistSong.destroy({ where: { songId: id } });
    } catch (err) {
      console.log(err);
      return { success: false };
    }
    return { success: true };
  }
}
