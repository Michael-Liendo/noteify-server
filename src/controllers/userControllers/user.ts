import { FastifyRequest, FastifyReply } from 'fastify';

export default async function userControllers(
  request: FastifyRequest,
  response: FastifyReply
) {
  // TODO: user controllers

  response.send({ hello: 'hello user' });
}
