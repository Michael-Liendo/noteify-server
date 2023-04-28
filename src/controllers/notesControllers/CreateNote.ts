import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import createNote from '../../domain/repository/notes/createNote';

export default async function createNoteController(
  request: FastifyRequest,
  response: FastifyReply
) {
  try {
    const { authorization } = request.headers as { authorization: string };
    const { title, content } = request.body as {
      title?: string;
      content?: string;
    };

    if (!title || !content) {
      throw {
        statusCode: 400,
        message: 'Missing title or content',
        error: 'Bad Request',
      };
    }

    const token = authorization.replace('JWT ', '');

    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

    const note = await createNote(userId, title, content).catch((error) => {
      throw {
        statusCode: 500,
        message: error.detail,
        error: error.message,
      };
    });

    response.status(201).send({
      statusCode: 201,
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
