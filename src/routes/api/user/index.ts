import { FastifyInstance } from 'fastify';
import usersController from '../../../controllers/userControllers/users';

export default function users(fastify: FastifyInstance, options, done) {
  fastify.get('/users', usersController);

  done();
}
