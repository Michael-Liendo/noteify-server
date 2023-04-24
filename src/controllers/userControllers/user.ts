import { FastifyRequest, FastifyReply } from 'fastify';
import { getUserById } from '../../domain/repository/user/getUser';

export default async function userController(
  request: FastifyRequest,
  response: FastifyReply
) {
  try {
    const { id } = request.params as { id: string };

    const user = await getUserById(id).catch((error) => {
      if (error.code === '22P02' || error.code === '404') {
        throw {
          statusCode: 404,
          message: 'Not found user',
          error: 'Not Found',
        };
      } else {
        throw {
          statusCode: 500,
          message: error.detail,
          error: error.message,
        };
      }
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
