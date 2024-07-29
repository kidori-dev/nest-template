import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import bcrypt from 'bcryptjs';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { plainToInstance } from 'class-transformer';
import { UserService } from 'src/modules/user/user.service';
import { NullableType } from 'src/utils/types/nullable.type';
import { UserDto } from '../user/dto/user.dto';
import { AuthForgotUsernameDto } from './dto/auth-forgot-username.dto';
import { AuthForgotPasswordDto } from './dto/auth-forgot-password.dto';
import { SendForgetPwReq } from '../mail/interface/send-forget-pw-req';
import { SessionPayloadType } from './session/session-payload.type';
import {
  InactiveUserException,
  IncorrectOldPasswordException,
  IncorrectPasswordException,
  MissingOldPasswordException,
  UserNotFoundException,
} from '../../exceptions/exception-422';
import { randomStr } from '../../utils/helper';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateLogin(username: string, password: string): Promise<UserDto> {
    const user = await this.userService.findOne({ username: username });
    if (!user) throw new UserNotFoundException();
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new IncorrectPasswordException();
    return plainToInstance(UserDto, user);
  }

  async validateSessionUser(userName: string): Promise<UserDto> {
    const user = await this.userService.findOne({
      username: userName,
      status: 1,
    });
    if (!user) throw new InactiveUserException();

    return plainToInstance(UserDto, user);
  }

  async getUsername(forgotUsernameDto: AuthForgotUsernameDto): Promise<string> {
    const user = await this.userService.findOne({
      email: forgotUsernameDto.email,
    });
    if (!user) throw new UserNotFoundException();

    return user.username;
  }

  async resetPassword(
    forgotPassword: AuthForgotPasswordDto,
  ): Promise<SendForgetPwReq> {
    const user = await this.userService.findOne({
      email: forgotPassword.email,
      username: forgotPassword.username,
    });
    if (!user) throw new UserNotFoundException();

    const randomPassword = randomStr();

    user.password = randomPassword;
    await user.save();

    return {
      randomPassword: randomPassword,
      username: user.username,
      email: user.email,
    };
  }

  async confirmPassword(
    password: string,
    userSessionPayload: SessionPayloadType,
  ): Promise<boolean> {
    const currentUser = await this.userService.findOne({
      id: userSessionPayload.id,
    });

    if (!currentUser) throw new UserNotFoundException();

    const result = await bcrypt.compare(password, currentUser.password);

    if (!result) throw new IncorrectPasswordException();

    return true;
  }

  async update(
    userSessionPayload: SessionPayloadType,
    userDto: AuthUpdateDto,
  ): Promise<NullableType<User>> {
    if (userDto.password) {
      if (userDto.oldPassword) {
        const currentUser = await this.userService.findOne({
          id: userSessionPayload.id,
        });
        if (!currentUser) throw new UserNotFoundException();
        const isValidOldPassword = await bcrypt.compare(
          userDto.oldPassword,
          currentUser.password,
        );
        if (!isValidOldPassword) throw new IncorrectOldPasswordException();
      } else {
        throw new MissingOldPasswordException();
      }
    }

    await this.userService.update(userSessionPayload.id, userDto);

    return this.userService.findOne({
      id: userSessionPayload.id,
    });
  }
}
