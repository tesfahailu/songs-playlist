import React from 'react';
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';

export const StyledTypography = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const classes = useStyles();
  return (
    <Typography className={classes.typography} variant="h6">
      {children}
    </Typography>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: { marginTop: 5, marginBottom: 20 },
  }),
);
