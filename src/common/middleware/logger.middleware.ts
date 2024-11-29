import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRETKEY); // ตรวจสอบ Token

      if(typeof decoded === 'object' && decoded !== null && 'role' in decoded && decoded.role !== 'admin'){
        return  res.status(444).json({ message : "แก ไม่มีสิทธิ์เข้าถึงข้อมูลนี้"})
      }

      if (typeof decoded === 'object' && decoded !== null && 'message' in decoded) {
        if (decoded.message !== 'psm-thammasatt') {
          return res.status(403).json({ message: 'Forbidden: Invalid message in token' });
        }
      } else {
        return res.status(401).json({ message: 'Invalid token structure' });
      }
      req['user'] = decoded;
    
      next();

    }  catch (error) {
  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token has expired' });
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token' });
  }
  return res.status(500).json({ message: 'Internal server error' });
}
  }
}
