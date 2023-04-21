import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserRequest } from '../../types/AuthRequest';
import { hashPassword } from '../../helpers/hashPassword';
import { createUser } from '../../domain/repository/user/createUser';

export default async function registerControllers(
  request: FastifyRequest,
  response: FastifyReply
) {
  try {
    const { full_name, email, password } = request.body as CreateUserRequest;

    if (!full_name || !email || !password) {
      throw Error('You must send an email and password');
    }

    const hashedPassword = await hashPassword(password);

    // todo register validations
    try {
      const userCreation = await createUser({
        full_name,
        email,
        password: hashedPassword,
      });
      response.send({
        userCreation,
      });
    } catch (error) {
      throw new Error(error);
    }
  } catch (error) {
    console.log(error);

    response.code(400).send({ error: error.message });
  }
}
