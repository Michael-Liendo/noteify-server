// controller to delete a note
import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { deleteNoteById } from '../../domain/repository/notes/deleteNote';

export default async function deleteNoteController(
  request: FastifyRequest,
  response: FastifyReply
) {
  try {
    const { authorization } = request.headers as { authorization: string };
    const token = authorization.replace('JWT ', '');

    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

    const { id } = request.params as { id: string };

    const note = await deleteNoteById(id, userId).catch((error) => {
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
