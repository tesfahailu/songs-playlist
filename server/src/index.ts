import connectToDB from './db/sequelize';
import express from 'express';
import 'dotenv/config';

(async () => {
  const port = process.env.SERVER_PORT;
  connectToDB();

  const app = express();
  app.get('/', (_req, res) => res.send('Hello World!'));

  app.listen(port, () =>
    console.log(`Server listening at http://localhost:${port}`),
  );
})();
