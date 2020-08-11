import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { ResponsiveDrawer } from './components/ResponsiveDrawer';
import { GeneralAppBar } from './components/GeneralAppBar';

interface Props {
  children?: React.ReactNode;
  musicToolBarHeight: number;
  drawerWidth: number;
}

export default function MainLayout(props: Props) {
  const { children, musicToolBarHeight, drawerWidth } = props;
  const classes = useStyles(drawerWidth);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <ResponsiveDrawer
        handleDrawerToggle={handleDrawerToggle}
        musicToolBarHeight={musicToolBarHeight}
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
      />
      <div>
        <GeneralAppBar
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
        />
        <div style={{ width: '100%', height: '65px' }} />
        <main className={classes.main}>{children}</main>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
      overflow: 'scroll',
    },
    main: {
      height: 'calc(100% - 65px)',
      padding: '20px',
      width: (drawerWidth) => `calc(100vw - ${drawerWidth}px )`,
    },
  }),
);
