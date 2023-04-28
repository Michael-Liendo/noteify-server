import { FastifyRequest, FastifyReply } from 'fastify';
import { getUserById } from '../../domain/repository/user/getUser';
import jwt from 'jsonwebtoken';

export default async function userController(
  request: FastifyRequest,
  response: FastifyReply
) {
  try {
    const { id } = request.params as { id: string };

    const { authorization } = request.headers as { authorization: string };

    const token = authorization.replace('JWT ', '');

    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await getUserById(id || userId).catch((error) => {
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
