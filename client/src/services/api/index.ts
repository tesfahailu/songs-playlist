import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { tokenRefreshLink } from './Links/tokenRefresh';
import { requestLink } from './Links/request';
import { httpLink } from './Links/http';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([tokenRefreshLink, requestLink, httpLink]),
});
