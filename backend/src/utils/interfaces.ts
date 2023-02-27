import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IJwt extends JwtPayload {
  userId: string;
}

export interface RequestWithUser extends Request {
  user: {
    userId: string;
  };
}
