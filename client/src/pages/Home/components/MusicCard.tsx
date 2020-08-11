import React from 'react';
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';

interface DataProp {
  data: MusicCardProp;
}

interface MusicCardProp {
  img?: string;
  title?: string;
  author?: string;
}

export const MusicCard = ({ data }: DataProp) => {
  const classes = useStyles();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <img
        src={data.img}
        alt={data.title}
        style={{ height: 'auto', width: '100%', marginBottom: '20px' }}
      />
      <div>
        <Typography variant="caption" className={classes.typography}>
          {'listen: new album'.toUpperCase()}
        </Typography>
        <Typography variant="subtitle1" className={classes.typography}>
          {'Mach-Hommy'}
        </Typography>
        <Typography variant="subtitle2" className={classes.typography}>
          {'Mach Hard Lemonade'}
        </Typography>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'scroll',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    typography: {
      content: '',
      clear: 'both',
      display: 'table',
    },
  }),
);
