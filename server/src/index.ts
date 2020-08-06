import { SongResolver } from './graphql/resolvers/SongResolver';
import { PlaylistResolver } from './graphql/resolvers/PlaylistResolver';
import { ApolloServer } from 'apollo-server-express';
import connectToDataBase from './db/sequelize';
import express from 'express';
import 'dotenv/config';
import { buildSchema } from 'type-graphql';
import { PersonResolver } from './graphql/resolvers/PersonResolver';
import cookieParser from 'cookie-parser';
import refreshTokenMiddleware from './middleware/refreshTokenMiddleware';
import { AuthResolver } from './graphql/resolvers/authResolver';
import cors from 'cors';

(async () => {
  const app = express();
  const serverPort = process.env.SERVER_PORT;
  const clientDomain = process.env.CLIENT_DOMAIN;
  const clientPort = process.env.CLIENT_PORT;

  connectToDataBase();
  app.use(
    cors({
      origin: `${clientDomain}:${clientPort}`,
      credentials: true,
    }),
  );
  app.use(cookieParser());
  app.get('/', (_req, res) => res.send('Hello World!'));
  app.post('/refresh_token', (req, res) => refreshTokenMiddleware(req, res));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver, PersonResolver, PlaylistResolver, SongResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(serverPort, () =>
    console.log(`Server listening at http://localhost:${serverPort}`),
  );
})();
