import { FastifyRequest, FastifyReply } from 'fastify';

export default async function loginControllers(
  request: FastifyRequest,
  response: FastifyReply
) {
  // TODO: Login controllers

  response.send({ login: 'Login route' });
}
