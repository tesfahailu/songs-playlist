import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  IconButton,
  Typography,
  ListItemText,
  TextField,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      minWidth: 400,
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    rootDialogContent: {
      padding: theme.spacing(2),
      paddingTop: 0,
    },
    rootDialogActions: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }),
);

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  const classes = useStyles();
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

export interface DialogContentProps {
  id: string;
  children?: React.ReactNode;
  dividers?: boolean | undefined;
}

const DialogContent = (props: DialogContentProps) => {
  const { children, ...other } = props;
  const classes = useStyles();
  return (
    <MuiDialogContent className={classes.rootDialogContent} {...other}>
      {children}
    </MuiDialogContent>
  );
};

const DialogActions = ({ children }: { children?: React.ReactNode }) => {
  const classes = useStyles();
  return (
    <MuiDialogActions className={classes.rootDialogActions}>
      {children}
    </MuiDialogActions>
  );
};

export default function PlaylistDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <div>
      <ListItemText primary="Create New Playlist" onClick={handleClickOpen} />
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        color="primary"
        className={classes.root}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create new playlist
        </DialogTitle>
        <DialogContent id="customized-dialog-content">
          <form noValidate autoComplete="off">
            <TextField
              autoFocus
              required
              margin="dense"
              id="playlist-title"
              label="Title"
              fullWidth
              placeholder="Playlist name"
            />
            <TextField
              margin="dense"
              id="playlist-description"
              label="Description"
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Create new
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
