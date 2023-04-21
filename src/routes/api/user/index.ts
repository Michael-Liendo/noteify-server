import { FastifyInstance } from 'fastify';
import userControllers from '../../../controllers/userControllers/user';

export default function user(fastify: FastifyInstance, options, done) {
  fastify.get('/user', userControllers);

  done();
}
