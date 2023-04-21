import * as dotenv from 'dotenv';
dotenv.config();

import Fastify from 'fastify';
import database from './domain/database';
const fastify = Fastify();

database
  .raw('select 1')
  .then(() =>
    console.log('Connection to database has been established successfully')
  )
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  });

fastify.listen(
  { port: Number(process.env.PORT) || 3000 },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server is now listening on ${address}`);
  }
);
