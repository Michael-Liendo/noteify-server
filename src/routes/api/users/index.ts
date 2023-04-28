import { FastifyInstance } from 'fastify';
import usersController from '../../../controllers/userControllers/users';
import userController from '../../../controllers/userControllers/user';
import verifyToken from '../../../middleware/verifyToken';

export default function users(fastify: FastifyInstance, options, done) {
  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: verifyToken,
    handler: usersController,
  });

  fastify.route({
    method: 'GET',
    url: '/user/:id',
    preHandler: verifyToken,
    handler: userController,
  });

  done();
}
