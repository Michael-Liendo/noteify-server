import jwt from 'jsonwebtoken';
import { User } from '../types/User';

export default function generateToken(user: User) {
  const payload = { id: user.id, email: user.email };
  const options = { expiresIn: '15d' };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}
