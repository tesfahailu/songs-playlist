let accessToken = '';

export const setAccessToken = (jwt: string) => {
  accessToken = jwt;
};

export const getAccessToken = () => {
  return accessToken;
};
