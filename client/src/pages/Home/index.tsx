import React, { Fragment } from 'react';
import { ScrollableList } from './components/ScrollableList';
import { Typography, createStyles, makeStyles, Theme } from '@material-ui/core';

interface HomeProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: { marginTop: 5, marginBottom: 20 },
  }),
);

const StyledTypography = ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.typography} variant="h6">
      {children}
    </Typography>
  );
};

export const Home: React.FC<HomeProps> = () => {
  return (
    <Fragment>
      <StyledTypography>FEATURED</StyledTypography>
      <ScrollableList />
      <StyledTypography>RECENTLY PLAYED</StyledTypography>
      <ScrollableList />
      <StyledTypography>SUGGESTED NEW TRACKS</StyledTypography>
      <ScrollableList />
      <StyledTypography>SUGGESTED NEW ALBUMS</StyledTypography>
      <ScrollableList />
    </Fragment>
  );
};
