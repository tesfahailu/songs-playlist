import { Sequelize } from 'sequelize-typescript';

export default async () => {
  const sequelize = await new Sequelize(process.env.SQL_CONNECTION_URL || '', {
    define: {
      timestamps: false,
    },
    dialect: 'postgres',
    models: [__dirname + '/models'],
  });

  sequelize
    .authenticate()
    .then(async () => {
      console.log('Data base connected successfully');
    })
    .catch((err: any) => console.log('Error', err));

  return sequelize;
};
