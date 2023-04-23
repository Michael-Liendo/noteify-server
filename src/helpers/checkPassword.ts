import bcrypt from 'bcrypt';

export default async function checkPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
