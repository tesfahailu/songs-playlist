import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <Fragment>
      <header>
        <div>
          <div>
            <Link to="/Home">Home</Link>
          </div>
          <div>
            <Link to="/User">User</Link>
          </div>
          <div>
            <Link to="/Playlist">Playlist</Link>
          </div>
        </div>
      </header>
      {props.children}
    </Fragment>
  );
};
