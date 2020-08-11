import React from 'react';
import {
  Drawer,
  Hidden,
  useTheme,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { DrawerContent } from './../components/DrawerContent';

interface StyleProps {
  width: number;
  height: number;
}

export const ResponsiveDrawer = ({
  handleDrawerToggle,
  mobileOpen,
  musicToolBarHeight,
  drawerWidth,
}: {
  handleDrawerToggle: () => void;
  mobileOpen: boolean | undefined;
  musicToolBarHeight: number;
  drawerWidth: number;
}) => {
  const props: StyleProps = {
    height: musicToolBarHeight,
    width: drawerWidth,
  };
  const classes = useStyles(props);
  const theme = useTheme();

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <DrawerContent />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <DrawerContent />
        </Drawer>
      </Hidden>
    </nav>
  );
};

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: (props) => props.width as any,
        flexShrink: 0,
      },
      height: 'auto',
    },
    drawerPaper: {
      width: (props) => props.width as any,
      height: (props) => `calc(100% - ${props.height}px)`,
    },
  }),
);
