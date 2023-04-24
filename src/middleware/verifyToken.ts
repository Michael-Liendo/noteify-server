import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

export default function verifyToken(
  request: FastifyRequest,
  response: FastifyReply,
  next
) {
  let token = request.headers.authorization;

  if (token && token.startsWith('JWT ')) {
    token = token.slice(4, token.length);
  }

  if (!token) {
    return response.status(401).send({
      statusCode: 401,
      error: { message: 'Token not provided', error: 'Unauthorized' },
      data: null,
      success: false,
    });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    return response.status(401).send({
      statusCode: 401,
      error: { message: 'Invalid token', error: 'Unauthorized' },
      data: null,
      success: false,
    });
  }
}
