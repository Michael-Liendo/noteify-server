import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      error: { message: 'Token not provided', error: 'Unauthorized' },
      data: null,
      success: false,
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      statusCode: 401,
      error: { message: 'Invalid token', error: 'Unauthorized' },
      data: null,
      success: false,
    });
  }
}
