import { env } from '../../../environments/environment';
import { HttpLink } from '@apollo/client';

export const httpLink = new HttpLink({
  uri: env.serverURI + env.graphqlPath,
  credentials: 'include',
});
