import { Request } from 'express';
import { UserEntity } from '../entities/user.entity';

export interface UserPayloadToken {
  email: string;
  sub: number;
  iat: number;
}

export interface ExtendedRequest<Val = Record<any, any>> extends Request {
  user: UserEntity; }
