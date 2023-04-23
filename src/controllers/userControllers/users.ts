import { FastifyRequest, FastifyReply } from 'fastify';
import getUsers from '../../domain/repository/user/getUsers';

export default async function usersController(
  request: FastifyRequest,
  response: FastifyReply
) {
  try {
    const users = await getUsers();

    response.send({
      statusCode: 200,
      data: { users },
      error: null,
      successful: true,
    });
  } catch (error) {
    response.code(error.statusCode || 500).send({
      statusCode: error.statusCode || 500,
      error: {
        message: error.message || 'Internal Server Error',
        error: error.error || 'Internal Server Error',
      },
      data: null,
      success: false,
    });
  }
}
