import { CreateUserRequest } from '../../../types/AuthRequest';
import database from '../../database';

export async function createUser(
  user: CreateUserRequest
): Promise<CreateUserRequest> {
  try {
    const [createdUser] = await database('users').insert(user).returning('*');

    return createdUser;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}
