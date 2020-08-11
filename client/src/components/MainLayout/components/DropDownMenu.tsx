import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton } from '@material-ui/core';
import { MoreHoriz as MoreHorizIcon } from '@material-ui/icons';

const StyledMenuItem = React.forwardRef(
  ({ children }: { children: React.ReactNode }, ref) => {
    const classes = useStyles();
    return <MenuItem className={classes.root}>{children}</MenuItem>;
  },
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }),
);

export const DropDownMenu = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        className={classes.paper}
        id="customized-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <StyledMenuItem>
          <ListItemText secondary="Settings" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText secondary="Logout" />
        </StyledMenuItem>
      </Menu>
    </Fragment>
  );
};
