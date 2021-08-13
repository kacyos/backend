import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    console.log(user);
    if (user && user.password === password) {
      const {password, ...res} = user;
      return res;
    }
    return null;
  }
}