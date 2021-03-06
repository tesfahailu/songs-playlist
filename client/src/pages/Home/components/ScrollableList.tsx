import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { tileData } from './tileData';
import { Typography } from '@material-ui/core';

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

export function ScrollableList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={5} spacing={30}>
        {tileData.map((tile) => (
          <GridListTile
            key={tile.img}
            style={{
              height: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <img
                src={tile.img}
                alt={tile.title}
                style={{ height: 'auto', width: '100%' }}
              />
              <div style={{ marginBottom: 50 }}>
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
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
