import { Typography } from '@material-ui/core';
import React from 'react';

type StyledTypographyProp = {
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

export const StyledTypography = ({
  name,
  children,
  color,
}: StyledTypographyProp) => (
  <Typography component="h2" variant="h5" display="inline" color={color}>
    {name}
    {children}
  </Typography>
);
