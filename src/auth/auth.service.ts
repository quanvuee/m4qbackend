import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneWithHassPw(username);
    const passValid = user && (await bcrypt.compare(pass,user.hashPassword))
    if (passValid) {
      const { hashPassword, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any){
    const payload = {username: user.username, sub: user.userId};
    return {
        access_token: this.jwtService.sign(payload),
    }
  }
}
