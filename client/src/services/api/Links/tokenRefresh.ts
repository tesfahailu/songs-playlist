import { env } from './../../../environments/environment';
import { setAccessToken } from '../../session/accessToken';
import { getAccessToken } from '../../session/accessToken';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';

export const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();
    if (!token) return true;
    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch(env.serverURI + env.refreshTokenPath, {
      method: 'POST',
      credentials: 'include',
    });
  },
  handleFetch: (accessToken) => {
    setAccessToken(accessToken);
  },
  handleError: (err) => {
    console.warn('Your refresh token is invalid. Try to login again');
    console.log(err);
  },
});
