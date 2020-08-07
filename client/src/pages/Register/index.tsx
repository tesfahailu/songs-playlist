import React from 'react';
import {
  Typography,
  Link,
  makeStyles,
  Container,
  Grid,
  TextField,
  Button,
  Box,
  Card,
} from '@material-ui/core';
import { StyledTypography } from '../../components/StyledTypography';
import { Share } from '@material-ui/icons';
import { CopyRight } from '../../components/CopyRight';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 100,
  },
  card: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Register: React.FC = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm" className={classes.container}>
      <Card className={classes.card}>
        <StyledTypography>
          <Share color="primary" className={classes.icon} />
          Shared
          <StyledTypography color="primary">Playlist</StyledTypography>
        </StyledTypography>
        <Typography component="h1" variant="h6">
          Register New User
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="lname"
                name="lastName"
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="current-password"
                name="password"
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an accout? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        <Box mt={5}>
          <CopyRight />
        </Box>
      </Card>
    </Container>
  );
};
