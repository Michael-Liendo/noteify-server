import { FastifyInstance } from 'fastify';
import registerControllers from '../../../controllers/AuthControllers/register';
import loginControllers from '../../../controllers/AuthControllers/login';

export default function auth(fastify: FastifyInstance, options, done) {
  fastify.post('/login', loginControllers);

  fastify.post('/register', registerControllers);

  done();
}
