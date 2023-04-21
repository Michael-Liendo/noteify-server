import { FastifyRequest, FastifyReply } from 'fastify';

export default async function registerControllers(
  request: FastifyRequest,
  response: FastifyReply
) {
  // TODO: Register controllers

  response.send({ register: 'register router' });
}
