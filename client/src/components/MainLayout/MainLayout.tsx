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
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <GeneralAppBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <ResponsiveDrawer
        handleDrawerToggle={handleDrawerToggle}
        musicToolBarHeight={musicToolBarHeight}
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);
