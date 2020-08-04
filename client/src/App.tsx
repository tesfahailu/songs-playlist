import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

function App() {
  console.log(peopleQuery);
  const { data, loading } = useQuery(peopleQuery);
  if (loading) return <div>Loading...</div>;
  return <h1>This is not working {JSON.stringify(data)}</h1>;
}

export default App;

const peopleQuery = gql`
  query {
    people {
      userName
      email
      userName
    }
  }
`;
