import { ApolloServer } from 'apollo-server-express';
import connectToDataBase from './db/sequelize';
import express from 'express';
import 'dotenv/config';
import { buildSchema } from 'type-graphql';
import { PersonResolver } from './graphql/resolvers/PersonResolver';
import cookieParser from 'cookie-parser';
import refreshTokenMiddleware from './middleware/refreshTokenMiddleware';
import { AuthResolver } from './graphql/resolvers/authResolver';

(async () => {
  const app = express();
  const port = process.env.SERVER_PORT;

  connectToDataBase();
  app.use(cookieParser());
  app.get('/', (_req, res) => res.send('Hello World!'));
  app.post('/refresh_token', (req, res) => refreshTokenMiddleware(req, res));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver, PersonResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(port, () =>
    console.log(`Server listening at http://localhost:${port}`),
  );
})();
