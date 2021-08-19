import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usuarioService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usuarioService.findOne(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, access_token, ...res } = user;
      return res;
    }

    return null;
  }
}
