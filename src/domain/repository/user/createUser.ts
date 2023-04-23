import { CreateUserRequest } from '../../../types/AuthRequest';
import { User } from '../../../types/User';
import database from '../../database';

export async function createUser(user: CreateUserRequest): Promise<User> {
  try {
    const [createdUser] = await database('users').insert(user).returning('*');

    return createdUser;
  } catch (error) {
    throw {
      detail: error.detail,
      message: error.message,
      code: error.code,
    };
  }
}
