import type { FastifyInstance } from 'fastify';
import auth from './api/auth';
import user from './api/user';

export default function routes(fastify: FastifyInstance, options, done) {
  fastify.get('/', async () => {
    return { hello: 'world' };
  });

  fastify.register(auth, { prefix: '/auth' });
  fastify.register(user, { prefix: '/users' });

  done();
}
