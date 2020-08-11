import { Typography, makeStyles } from '@material-ui/core';
import { Share } from '@material-ui/icons';
import React from 'react';

type StyleTextProp = {
  name?: string;
  children?: React.ReactNode;
  color?:
    | 'inherit'
    | 'initial'
    | 'textSecondary'
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'error'
    | undefined;
};

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
  },
}));

const StyleText = ({ name, children, color }: StyleTextProp) => (
  <Typography component="div" variant="h5" display="inline" color={color}>
    {name}
    {children}
  </Typography>
);

export const StyledLogo = ({
  secondaryClass,
}: {
  secondaryClass?: React.ReactNode;
}) => {
  const classes = useStyles();
  return (
    <StyleText>
      <Share color="primary" className={`${classes.icon} ${secondaryClass}`} />
      Shared
      <StyleText color="primary">Playlist</StyleText>
    </StyleText>
  );
};
