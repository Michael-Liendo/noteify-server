import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserRequest } from '../../types/AuthRequest';
import { hashPassword } from '../../helpers/hashPassword';
import { createUser } from '../../domain/repository/user/createUser';
import generateToken from '../../helpers/generateToken';
import { userSchema } from '../../domain/model/user/user';

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

    await userSchema.validate({ full_name, email, password }).catch((err) => {
      throw {
        statusCode: 400,
        error: { message: err.message, error: 'Bad Request' },
        data: null,
        success: false,
      };
    });

    const hashedPassword = await hashPassword(password);

    const user: CreateUserRequest = {
      full_name,
      email: email.toLocaleLowerCase(),
      password: hashedPassword,
    };

    try {
      const userCreation = await createUser(user);

      const token = await generateToken(userCreation);

      response.status(200).send({
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
          error: 'Bad Request',
          message: `${column} already exists`,
        };
      } else if (error.code === '23502') {
        throw {
          statusCode: 400,
          error: 'Bad Request',
          message: 'A field is missing',
        };
      } else {
        console.error(error);
        throw {
          statusCode: 500,
          error: 'Internal Server Error',
          message: error.message,
        };
      }
    }
  } catch (error) {
    response.code(error.statusCode || 500).send({
      statusCode: error.statusCode || 500,
      error: {
        message: error.message || error,
        error: error.error || 'Internal Server Error',
      },
      data: null,
      success: false,
    });
  }
}
