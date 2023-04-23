import { FastifyInstance } from 'fastify';
import usersController from '../../../controllers/userControllers/users';
import userController from '../../../controllers/userControllers/user';

export default function users(fastify: FastifyInstance, options, done) {
  fastify.get('/', usersController);
  fastify.get('/:id', userController);

  done();
}
