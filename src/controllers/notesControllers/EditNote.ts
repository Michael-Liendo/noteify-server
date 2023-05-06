// edit note controller
import { FastifyRequest, FastifyReply } from 'fastify';
import editNote from '../../domain/repository/notes/editNote';
import jwt from 'jsonwebtoken';

export default async function editNoteController(
  request: FastifyRequest,
  response: FastifyReply
) {
  const { id } = request.params as { id: string };
  const { title, content } = request.body as { title: string; content: string };
  const authorization = request.headers.authorization as string;
  const token = authorization.replace('JWT ', '');
  const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const note = await editNote(id, userId, title, content).catch((error) => {
      if (error.code === '22P02' || error.code === '404') {
        throw {
          statusCode: 404,
          message: 'Not found note',
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
      error: null,
      data: note,
      success: true,
    });
  } catch (error) {
    response.status(error.statusCode || 500).send({
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
