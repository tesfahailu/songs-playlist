import React, { Fragment } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Theme,
  createStyles,
  Avatar,
  Typography,
  Grid,
  Slider,
} from '@material-ui/core';
import {
  PlayArrow as PlayArrowIcon,
  SkipPrevious as SkipPreviousIcon,
  SkipNext as SkipNextIcon,
  Shuffle as ShuffleIcon,
  Repeat as RepeatIcon,
  VolumeDown,
  VolumeUp,
} from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 200,
    },
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    toolBar: {
      height: (musicToolBarHeight) => `${musicToolBarHeight}px`,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
      height: (musicToolBarHeight) => `${musicToolBarHeight}px`,
    },
    grow: {
      flexGrow: 1,
    },
    children: {
      height: (musicToolBarHeight) => `calc(100vh - ${musicToolBarHeight}px)`,
    },
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }),
);

interface FixedBottomProp {
  children: React.ReactNode;
  musicToolBarHeight: number;
}

export const MusicToolBar = ({
  children,
  musicToolBarHeight,
}: FixedBottomProp) => {
  const [value, setValue] = React.useState<number>(30);
  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
  };
  const classes = useStyles(musicToolBarHeight);
  return (
    <Fragment>
      <div className={classes.children}>{children}</div>
      <AppBar
        position="fixed"
        color="primary"
        className={classes.appBar}
        component="footer"
      >
        <Toolbar className={classes.toolBar}>
          <Avatar
            variant="square"
            src="https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/vimesf2ribb6ckv78wor/amine-limbo-album-cover"
            className={classes.avatar}
          ></Avatar>
          <div style={{ height: '100%', paddingTop: '10px', marginLeft: 15 }}>
            <Typography variant="h6">Accepting My Flaws</Typography>
            <Typography variant="subtitle2">Future, Drake</Typography>
            <Typography variant="subtitle2">{`Playing from: track`}</Typography>
          </div>
          <div className={classes.grow} />
          <IconButton color="secondary">
            <ShuffleIcon fontSize="large" />
          </IconButton>
          <IconButton color="secondary">
            <SkipPreviousIcon fontSize="large" />
          </IconButton>
          <IconButton color="secondary">
            <PlayArrowIcon fontSize="large" />
          </IconButton>
          <IconButton color="secondary">
            <SkipNextIcon fontSize="large" />
          </IconButton>
          <IconButton color="secondary">
            <RepeatIcon fontSize="large" />
          </IconButton>
          <div className={classes.grow} />
          <div className={classes.root}>
            <Typography id="continuous-slider" gutterBottom>
              Volume
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <VolumeDown />
              </Grid>
              <Grid item xs>
                <Slider
                  value={value}
                  onChange={handleChange}
                  aria-labelledby="continuous-slider"
                  color="secondary"
                />
              </Grid>
              <Grid item>
                <VolumeUp />
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};
