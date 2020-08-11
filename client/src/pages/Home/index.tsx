import React, { Fragment } from 'react';
import { ScrollableList } from './components/ScrollableList';
import { FormatPageHeaderDiv } from '../../components/FormatPageHeaderDiv';
import { StyledTypography } from '../../components/StyledTypography';

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  return (
    <Fragment>
      <StyledTypography>Featured</StyledTypography>
      <ScrollableList />
      <FormatPageHeaderDiv />
      <StyledTypography>Recently Played</StyledTypography>
      <ScrollableList />
      <FormatPageHeaderDiv />
      <StyledTypography>Suggested New Tracks</StyledTypography>
      <ScrollableList />
      <FormatPageHeaderDiv />
      <StyledTypography>Suggested New Albums</StyledTypography>
      <ScrollableList />
    </Fragment>
  );
};
