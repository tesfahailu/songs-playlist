import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Register } from '../../pages/Register';
import { Login } from '../../pages/Login';
import { Home } from '../../pages/Home';
import { User } from '../../pages/User';
import { Playlist } from '../../pages/Playlist';
import MainLayout from '../../components/MainLayout/MainLayout';
import { MusicToolBar as BottomMusicToolBar } from '../../components/MusicToolBar';
import { Track } from '../../pages/Track';
import { Artist } from '../../pages/Artist';
import { Album } from '../../pages/Album';

export const Routes: React.FC = () => {
  const musicToolBarHeight = 100;
  const drawerWidth = 220;
  return (
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Switch>
        <BottomMusicToolBar musicToolBarHeight={musicToolBarHeight}>
          <MainLayout
            musicToolBarHeight={musicToolBarHeight}
            drawerWidth={drawerWidth}
          >
            <Route path="/user" component={User} />
            <Route path="/home" component={Home} />
            <Route path="/playlist" component={Playlist} />
            <Route path="/album" component={Album} />
            <Route path="/track" component={Track} />
            <Route path="/artist" component={Artist} />
          </MainLayout>
        </BottomMusicToolBar>
      </Switch>
    </Switch>
  );
};
