import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Register } from '../../pages/Register';
import { Login } from '../../pages/Login/Login';
import { Home } from '../../pages/Home';
import { User } from '../../pages/User';
import { Playlist } from '../../pages/Playlist';

export const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Switch>
          <Header>
            <Route path="/home" component={Home} />
            <Route path="/user" component={User} />
            <Route path="/playlist" component={Playlist} />
          </Header>
        </Switch>
      </Switch>
    </Router>
  );
};
