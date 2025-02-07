import jwt from 'jsonwebtoken';

const KEY = process.env.JWT_SECRET!;

class JwtService {
  generateJwt(userId: number) {
    return jwt.sign({ userId }, KEY, {
      expiresIn: '24h',
    });
  }
}

export default new JwtService();
