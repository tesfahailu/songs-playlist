import React, { useEffect } from 'react';
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
  MoreHoriz as MoreHorizIcon,
} from '@material-ui/icons';
import { DropDownMenu } from './DropDownMenu';

export const DrawerContent = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleClose = () => {
    console.log('Trying to close');
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log('Value of anchor element', anchorEl);
  }, [anchorEl]);

  return (
    <div>
      <List>
        <ListItem key="styled-logo">
          <ListItemIcon>
            <StyledLogo />
          </ListItemIcon>
        </ListItem>
        <ListItem button key="user-settings">
          <Grid
            container
            alignItems="flex-end"
            justify="space-between"
            className={classes.userAvatar}
          >
            <Grid item>
              <Avatar alt="image of user" src="/IMG_1191.JPG" />
            </Grid>
            <Grid item onClick={handleClick}>
              <MoreHorizIcon />
              <DropDownMenu anchorEl={anchorEl} handleClose={handleClose} />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem button key="home">
          <ListItemText primary="Home" />
        </ListItem>
        <ListSubheader component="div" id="nested-list-subheader-collection">
          My Collection
        </ListSubheader>
        {[
          ['Playlist', <QueueMusicIcon />],
          ['Albums', <AlbumIcon />],
          ['Tracks', <AudiotrackIcon />],
          ['Artists', <MicIcon />],
        ].map(([text, icon], index) => (
          <ListItem button key={text + index.toString()}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <ListSubheader component="div" id="nested-list-subheader-playlist">
          My Playlists
        </ListSubheader>
        <ListItem button>
          <AddCircleIcon className={classes.icon} />
          <ListItemText primary="Create New Playlist" />
        </ListItem>
        {['Sleep', 'Cool', 'Gym Workout'].map((text, index) => (
          <ListItem button key={text + index.toString()}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
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
  }),
);
