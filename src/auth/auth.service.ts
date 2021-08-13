import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    console.log(user);
    if (user &&  bcrypt.compareSync(password, user.password)) {
      const response = {
        user: {
          public_id: user.public_id,
          name: user.name,
          email: user.email,
        },
        access_token: user.access_token,
      };

      return response;
    }
    return null;
  }
}
