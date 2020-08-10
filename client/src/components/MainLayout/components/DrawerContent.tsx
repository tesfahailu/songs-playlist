import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  Grid,
  Avatar,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { StyledLogo } from '../../StyledTypography';
import {
  QueueMusic as QueueMusicIcon,
  Album as AlbumIcon,
  Audiotrack as AudiotrackIcon,
  Mic as MicIcon,
  AddCircle as AddCircleIcon,
} from '@material-ui/icons';
import { DropDownMenu } from './DropDownMenu';
import PlaylistDialog from './PlaylistDialog';
import { Link } from 'react-router-dom';

export const DrawerContent = () => {
  const classes = useStyles();

  return (
    <div>
      <List>
        <ListItem key="styled-logo">
          <ListItemIcon>
            <StyledLogo />
          </ListItemIcon>
        </ListItem>
        <ListItem key="user-settings">
          <Grid
            container
            alignItems="flex-end"
            justifyContent="space-between"
            className={classes.userAvatar}
          >
            <Grid item>
              <Avatar alt="image of user" src="/IMG_1191.JPG" />
            </Grid>
            <Grid item>
              <DropDownMenu />
            </Grid>
          </Grid>
        </ListItem>
        <StyledLink to="/home">
          <ListItem button key="home">
            <ListItemText primary="Home" />
          </ListItem>
        </StyledLink>
        <ListSubheader component="div" id="nested-list-subheader-collection">
          My Collection
        </ListSubheader>
        {[
          ['Playlist', <QueueMusicIcon />, '/playlist'],
          ['Albums', <AlbumIcon />, '/album'],
          ['Tracks', <AudiotrackIcon />, '/track'],
          ['Artists', <MicIcon />, '/artist'],
        ].map(([text, icon, route], index) => (
          <StyledLink to={route as string}>
            <ListItem button key={text + index.toString()}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </StyledLink>
        ))}
        <ListSubheader component="div" id="nested-list-subheader-playlist">
          My Playlists
        </ListSubheader>
        <ListItem button>
          <AddCircleIcon className={classes.icon} />
          <PlaylistDialog />
        </ListItem>
        {['Sleep', 'Cool', 'Gym Workout'].map((text, index) => (
          <StyledLink to="">
            <ListItem button key={text + index.toString()}>
              <ListItemText primary={text} />
            </ListItem>
          </StyledLink>
        ))}
      </List>
    </div>
  );
};

const StyledLink = ({
  children,
  ...other
}: {
  children: React.ReactNode;
  to: string;
}) => {
  const classes = useStyles();
  return (
    <Link className={classes.link} {...other}>
      {children}
    </Link>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    userAvatar: {
      paddingLeft: 5,
    },
    icon: {
      marginRight: 10,
    },
    link: {
      textDecoration: 'none',
      color: `${theme.palette.text.primary}`,
    },
  }),
);
