import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const { data, loading } = useQuery(peopleQuery);
  if (loading) return <div>Loading...</div>;
  return <div>Something is here {JSON.stringify(data)}</div>;
};

const peopleQuery = gql`
  query {
    people {
      username
      email
    }
  }
`;
