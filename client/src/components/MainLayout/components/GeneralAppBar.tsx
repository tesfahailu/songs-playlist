import React, { Fragment } from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  fade,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Search as SearchIcon,
} from '@material-ui/icons';

export const GeneralAppBar = ({
  drawerWidth,
  handleDrawerToggle,
}: {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}) => {
  const classes = useStyles(drawerWidth);
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar style={{ paddingLeft: '15px' }}>
        <HiddenMenuIcon handleDrawerToggle={handleDrawerToggle} />
        <PageNavigation />
        <RouteDisplay />
        <SearchBar />
      </Toolbar>
    </AppBar>
  );
};

const HiddenMenuIcon = ({
  handleDrawerToggle,
}: {
  handleDrawerToggle: () => void;
}) => {
  const classes = useStyles();
  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      className={classes.menuButton}
    >
      <MenuIcon />
    </IconButton>
  );
};

const PageNavigation = () => {
  return (
    <Fragment>
      <IconButton color="inherit" aria-label="back arrow" edge="start">
        <ArrowBackIcon />
      </IconButton>
      <IconButton color="inherit" aria-label="back arrow" edge="start">
        <ArrowForwardIcon />
      </IconButton>
    </Fragment>
  );
};

const RouteDisplay = () => (
  <Typography variant="subtitle1" noWrap>
    Cooling
  </Typography>
);

const SearchBar = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.grow}></div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    </Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: (drawerWidth) => `calc(100% - ${drawerWidth}px)`,
        marginLeft: (drawerWidth) => drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      minWidth: '300px',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    grow: {
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);
