import type { FastifyInstance } from 'fastify';
import auth from './api/auth';
import user from './api/users';
import notes from './api/notes';

export default function routes(fastify: FastifyInstance, options, done) {
  fastify.get('/', async () => {
    return { hello: 'world' };
  });

  fastify.register(auth, { prefix: '/auth' });
  fastify.register(user, { prefix: '/users' });
  fastify.register(notes, { prefix: '/notes' });

  done();
}
