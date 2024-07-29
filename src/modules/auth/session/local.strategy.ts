import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserDto } from '../../user/dto/user.dto';
import e from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    // constructor() {
    super({ usernameField: 'username', passwordField: 'password' });
  }

  authenticate(req: e.Request, options?: any) {
    req.logOut(function () {
      return true;
    });
    super.authenticate(req, options);
  }

  async validate(username: string, password: string): Promise<UserDto> {
    return await this.authService.validateLogin(username, password);
  }
}
