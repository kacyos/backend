/*import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { UsersService } from './users/users.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.access_token.toString();
    const users = await this.usersService.auth(token);

    if (!users) {
      throw new UnauthorizedException();
    }
    next();
  }
}*/
