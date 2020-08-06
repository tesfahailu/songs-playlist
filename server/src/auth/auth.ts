import { Person } from './../db/models/Person';
import { sign } from 'jsonwebtoken';

export const createAccessToken = (person: Person) => {
  return sign(
    { personUserName: person.username },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: '15min',
    },
  );
};

export const createRefreshToken = (person: Person) => {
  return sign(
    { personUserName: person.username, tokenVersion: person.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    },
  );
};
