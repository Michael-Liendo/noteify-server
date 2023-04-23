import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserRequest } from '../../types/AuthRequest';
import { hashPassword } from '../../helpers/hashPassword';
import { createUser } from '../../domain/repository/user/createUser';
import generateToken from '../../helpers/generateToken';

export default async function registerControllers(
  request: FastifyRequest,
  response: FastifyReply
) {
  try {
    const { full_name, email, password } = request.body as CreateUserRequest;

    if (!full_name || !email || !password) {
      throw {
        statusCode: 400,
        error: { message: 'Missing fields', error: 'Bad Request' },
        data: null,
        success: false,
      };
    }

    const hashedPassword = await hashPassword(password);

    // todo register validations
    try {
      const userCreation = await createUser({
        full_name,
        email,
        password: hashedPassword,
      });

      const token = await generateToken(userCreation);

      response.send({
        statusCode: 200,
        error: null,
        data: {
          token,
        },
        success: true,
      });
    } catch (error) {
      if (error.code === '23505') {
        const regex = /\(([^)]+)\)=(.*)/g;
        const [, column] = regex.exec(error.detail);

        throw {
          statusCode: 400,
          error: {
            error: 'Bad Request',
            message: `${column} already exists`,
          },
          data: null,
          success: false,
        };
      } else if (error.code === '23502') {
        throw {
          statusCode: 400,
          error: {
            error: 'Bad Request',
            message: 'A field is missing',
          },
          data: null,
          success: false,
        };
      } else {
        console.error(error);
        throw {
          statusCode: 500,
          error: {
            error: 'Internal Server Error',
            message: error.message,
          },
          data: null,
          success: false,
        };
      }
    }
  } catch (error) {
    response.code(error.statusCode || 500).send(error);
  }
}
