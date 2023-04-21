import bcrypt from 'bcrypt';

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);
}
