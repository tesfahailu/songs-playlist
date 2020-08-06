import { PlaylistSong } from './../../db/models/PlaylistSong';
import { PersonPlaylist } from './../../db/models/PersonPlaylist';
import { Person } from './../../db/models/Person';
import { Song } from './../../db/models/Song';
import { Playlist } from './../../db/models/Playlist';
import { Query, Arg, Mutation, ObjectType, Field } from 'type-graphql';

@ObjectType()
class SuccessResponse {
  @Field()
  success: Boolean;
}

export class PlaylistResolver {
  @Query(() => Playlist)
  async playlist(@Arg('id') id: number): Promise<Playlist | null> {
    try {
      return await Playlist.findOne({ where: { id }, include: [Song, Person] });
    } catch (err) {
      throw new Error('could not find playlist');
    }
  }

  @Query(() => [Playlist])
  async playlists(): Promise<Playlist[] | null> {
    return await Playlist.findAll({
      include: [Song, Person],
    });
  }

  @Mutation(() => Playlist)
  async createPlaylist(
    @Arg('username') username: string,
    @Arg('name') name: string,
  ): Promise<Playlist | null> {
    const person = await Person.findOne({ where: { username } });
    if (!person) throw new Error('user does not exist');

    const playlist = await Playlist.create({ name });
    if (!playlist) throw new Error('could not create playlist');

    try {
      await PersonPlaylist.create({
        username,
        playlistId: playlist.id,
      });
      return playlist;
    } catch (err) {
      throw new Error('could not associate user with playlist');
    }
  }

  @Mutation(() => Playlist)
  async updatePlaylist(
    @Arg('id') id: number,
    @Arg('name') name: string,
  ): Promise<Playlist | null> {
    const playlist = await Playlist.findOne({ where: { id } });
    if (!playlist) throw new Error('playlist does not exist');

    try {
      return (await Playlist.update({ name }, { where: { id } })) as any;
    } catch (err) {
      throw new Error('could not update playlist');
    }
  }

  @Mutation(() => SuccessResponse)
  async addPersonToPlaylist(
    @Arg('username') username: string,
    @Arg('playlistId') playlistId: number,
  ): Promise<SuccessResponse | null> {
    const person = await Person.findOne({ where: { username } });
    if (!person) throw new Error('user name does not exist');

    const playlist = await Playlist.findOne({ where: { id: playlistId } });
    if (!playlist) throw new Error('playlist does not exist');

    const personPlaylist = await PersonPlaylist.findOne({
      where: { username, playlistId },
    });
    if (personPlaylist)
      throw new Error('user is already associated with playlist');

    try {
      await PersonPlaylist.create({
        username,
        playlistId,
      });
      return { success: true };
    } catch (err) {
      throw new Error('could not add user to playlist');
    }
  }

  @Mutation(() => SuccessResponse)
  async removePersonFromPlaylist(
    @Arg('username') username: string,
    @Arg('playlistId') playlistId: number,
  ) {
    const person = await Person.findOne({ where: { username } });
    if (!person) throw new Error('user does not exist');

    const playlist = await Playlist.findOne({ where: { id: playlistId } });
    if (!playlist) throw new Error('playlist does not exist');

    const personPlaylist = await PersonPlaylist.findOne({
      where: { username, playlistId },
    });
    if (!personPlaylist) throw new Error('person not associated with playlist');

    if (Array.isArray(playlist.people) && playlist.people.length === 1) {
      await Promise.all([
        PlaylistSong.destroy({
          where: { playlistId: playlist.id },
        }),
        playlist.destroy(),
      ]).catch((err) => {
        throw new Error(err);
      });
    }

    try {
      personPlaylist.destroy();
    } catch (err) {
      throw new Error(err);
    }
    return { success: true };
  }

  @Mutation(() => SuccessResponse)
  async addSongToPlaylist(
    @Arg('playlistId') playlistId: number,
    @Arg('songId') songId: number,
  ): Promise<SuccessResponse | null> {
    const song = await Song.findOne({ where: { id: songId } });
    if (!song) throw new Error('song does not exist');

    const playlist = await Playlist.findOne({ where: { id: playlistId } });
    if (!playlist) throw new Error('playlist does not exist');

    const playlistSong = await PlaylistSong.findOne({
      where: { playlistId, songId },
    });
    if (playlistSong)
      throw new Error('song is already associated with playlist');

    try {
      await PlaylistSong.create({ playlistId, songId });
      return { success: true };
    } catch (err) {
      throw new Error('could not add song to playlist');
    }
  }

  @Mutation(() => SuccessResponse)
  async removeSongFromPlaylist(
    @Arg('playlistId') playlistId: number,
    @Arg('songId') songId: number,
  ) {
    const playlist = await Playlist.findOne({ where: { id: playlistId } });
    if (!playlist) throw new Error('playlist does not exist');

    const song = await Song.findOne({ where: { id: songId } });
    if (!song) throw new Error('song does not exist');

    const playlistSong = await PlaylistSong.findOne({
      where: {
        playlistId,
        songId,
      },
    });
    if (!playlistSong) throw new Error('song is not associated with playlist');

    try {
      playlistSong.destroy();
      return { success: true };
    } catch (err) {
      throw new Error('could not remove song from playlist');
    }
  }

  @Mutation(() => SuccessResponse)
  async deletePlaylist(@Arg('id') id: string): Promise<SuccessResponse> {
    const playlist = Playlist.findOne({ where: { id } });
    if (!playlist) throw new Error('playlist does not exist');
    try {
      await Playlist.destroy({ where: { id } });
    } catch (err) {
      console.log(err);
      return { success: false };
    }

    return { success: true };
  }
}
