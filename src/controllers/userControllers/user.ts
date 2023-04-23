import { FastifyRequest, FastifyReply } from 'fastify';
import { getUserById } from '../../domain/repository/user/getUser';

export default async function userController(
  request: FastifyRequest,
  response: FastifyReply
) {
  try {
    const { id } = request.params as { id: string };

    const user = await getUserById(id).catch((error) => {
      throw {
        statusCode: error.code,
        message: error.detail,
        error: error.message,
      };
    });

    response.code(200).send({
      statusCode: 200,
      data: {
        user,
      },
      error: null,
      success: true,
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
