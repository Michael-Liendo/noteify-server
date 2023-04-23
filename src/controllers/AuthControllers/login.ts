import { FastifyRequest, FastifyReply } from 'fastify';
import { userSchema } from '../../domain/model/user/user';
import { getUserByEmail } from '../../domain/repository/user/getUser';
import { CreateUserRequest } from '../../types/AuthRequest';
import checkPassword from '../../helpers/checkPassword';
import { User } from '../../types/User';
import generateToken from '../../helpers/generateToken';

export default async function loginControllers(
  request: FastifyRequest,
  response: FastifyReply
) {
  try {
    const { email, password } = request.body as CreateUserRequest;

    if (!email || !password) {
      throw {
        statusCode: 400,
        error: {
          message: 'Missing fields email or password',
          error: 'Bad Request',
        },
        data: null,
        success: false,
      };
    }

    await userSchema.validate({ email, password }).catch((err) => {
      throw {
        statusCode: 400,
        error: { message: err.message, error: 'Bad Request' },
        data: null,
        success: false,
      };
    });

    const user = (await getUserByEmail(email).catch((error) => {
      if (error.code === '404') {
        throw {
          statusCode: 401,
          error: {
            message: 'Invalid email or password',
            error: 'Unauthorized',
          },
          data: null,
          success: false,
        };
      }
    })) as User;

    const isPasswordValid = await checkPassword(password, user.password);
    if (!isPasswordValid) {
      throw {
        statusCode: 401,
        error: {
          message: 'Invalid email or password',
          error: 'Unauthorized',
        },
        data: null,
        success: false,
      };
    }

    const token = await generateToken(user);

    response.send({
      statusCode: 200,
      data: {
        token,
      },
      error: null,
      success: true,
    });

    response.send(user);
  } catch (error) {
    response.code(error.statusCode || 500).send(error);
  }
}
