import { User } from '../../../types/User';
import database from '../../database';

export default async function getUsers(): Promise<User[]> {
  try {
    const users = await database('users').select('id', 'full_name');

    return users;
  } catch (error) {
    throw {
      detail: error.detail,
      message: error.message,
      code: error.code,
    };
  }
}
