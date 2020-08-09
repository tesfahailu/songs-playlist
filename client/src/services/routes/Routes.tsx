import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Register } from '../../pages/Register';
import { Login } from '../../pages/Login';
import { Home } from '../../pages/Home';
import { User } from '../../pages/User';
import { Playlist } from '../../pages/Playlist';
import MainLayout from '../../components/MainLayout/MainLayout';
import { MusicToolBar as BottomMusicToolBar } from '../../components/MusicToolBar';

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
            <Header>
              <Route path="/home" component={Home} />
              <Route path="/user" component={User} />
              <Route path="/playlist" component={Playlist} />
            </Header>
          </MainLayout>
        </BottomMusicToolBar>
      </Switch>
    </Switch>
  );
};
