import React from 'react';
import { Typography, Link } from '@material-ui/core';

export const CopyRight = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright ©'}
    <Link color="inherit" href="#">
      Playlist
      <Typography variant="body2" color="primary" display="inline">
        Share
      </Typography>
    </Link>
    {` ${new Date().getFullYear()}`}
  </Typography>
);
