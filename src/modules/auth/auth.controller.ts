import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { AuthSessionLoginDto } from './dto/auth-session-login.dto';
import { User } from '../user/entities/user.entity';
import { NullableType } from 'src/utils/types/nullable.type';
import { LocalAuthGuard } from 'src/modules/auth/session/local-auth.guard';
import { AuthenticatedGuard } from 'src/modules/auth/session/authenticated.guard';
import { UserService } from 'src/modules/user/user.service';
import { UserDto } from '../user/dto/user.dto';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { plainToInstance } from 'class-transformer';
import { AuthConfirmEmailDto } from './dto/auth-confirm-email.dto';
import { MailService } from '../mail/mail.service';
import { AuthForgotUsernameDto } from './dto/auth-forgot-username.dto';
import { AuthConfirmPasswordDto } from './dto/auth-confirm-password.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('session/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '로그인',
    description: `로그인`,
  })
  async sessionUserLogin(@Body() dto: AuthSessionLoginDto, @Request() req) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('session/logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '로그아웃',
    description: `세션 로그아웃`,
  })
  async sessionLogout(@Request() req): Promise<any> {
    req.logOut(function () {
      return true;
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Get('session/check')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '세션 체크',
    description: `로그인이 되어있다면 현재 자산 및 바운드 정보 리턴`,
  })
  async sessionCheck(@Request() req): Promise<any> {
    const user = await this.authService.validateSessionUser(req.user.username);
    const data = req.session;

    const sessionTime = Number(process.env.SESSION_MAX_AGE ?? 3600000);
    data.expires = new Date(Date.now() + sessionTime);
    data.cookie.maxAge = sessionTime;
    data.save();

    return {
      ...user,
    };
  }

  @Post('/user/register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '회원가입',
    description: `회원가입`,
  })
  async register(@Body() dto: UserCreateDto): Promise<UserDto> {
    const user = plainToInstance(UserDto, await this.userService.create(dto));
    return user;
  }

  @Post('/user/send-code/email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '코드 요청 및 가입된 이메일인지 체크',
    description: `코드 요청 및 가입된 이메일인지 체크`,
  })
  async sendCode(@Body() dto: AuthConfirmEmailDto): Promise<void> {
    await this.mailService.sendEmailCode(dto.email);
  }

  @Get('/user/confirm-code/email/:code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '이메일 코드 확인',
    description: `send-code 요청으로 받은 코드 입력<br>이메일 코드 확인 (이메일 리턴)`,
  })
  async confirmEmailCode(@Param('code') code: string): Promise<string> {
    return await this.mailService.confirmEmailCode(code);
  }

  @Post('/user/find/username')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '유저네임 찾기',
    description: `유저네임 찾기`,
  })
  async findUsername(
    @Body() forgotUsernameDto: AuthForgotUsernameDto,
  ): Promise<string> {
    const username = await this.authService.getUsername(forgotUsernameDto);
    await this.mailService.sendForgotUsernameMail(
      forgotUsernameDto.email,
      username,
    );
    return username;
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/user/confirm/password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '패스워드 체크',
    description: `공통권한 <br>패스워드 체크`,
  })
  async confirmPassword(
    @Body() authConfirmPassword: AuthConfirmPasswordDto,
    @Request() request,
  ): Promise<boolean> {
    return await this.authService.confirmPassword(
      authConfirmPassword.password,
      request.user,
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Patch('/user/update')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '유저 업데이트',
    description: `유저 업데이트<br>패스워드 변경: 새로운 패스워드를 입력해준다.<br>type: all / account / password 중 하나 선택<br>`,
  })
  async update(
    @Request() request,
    @Body() dto: AuthUpdateDto,
  ): Promise<NullableType<User>> {
    return await this.authService.update(request.user, dto);
  }
}
