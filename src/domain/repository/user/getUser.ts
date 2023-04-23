import { User } from '../../../types/User';
import database from '../../database';

export async function getUserByEmail(email: string): Promise<User> {
  try {
    const [user] = await database('users').select().where({ email: email });
    if (!user) {
      throw {
        detail: 'User not found',
        message: 'User not found',
        code: '404',
      };
    }
    return user;
  } catch (error) {
    throw {
      detail: error.detail,
      message: error.message,
      code: error.code,
    };
  }
}

export async function getUserById(id: string): Promise<User> {
  try {
    const [user] = await database('users')
      .select('id', 'name', 'email')
      .where({ id: id });
    if (!user) {
      throw {
        detail: 'User not found',
        message: 'User not found',
        code: '404',
      };
    }
    return user;
  } catch (error) {
    throw {
      detail: error.detail,
      message: error.message,
      code: error.code,
    };
  }
}
