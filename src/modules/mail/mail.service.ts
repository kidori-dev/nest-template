import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../../config/config.type';

import { MoreThan, Repository } from 'typeorm';
import { EmailCode } from './entities/email-code.entity';
import moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeNotFoundException } from '../../exceptions/exception-422';
import { randomStr } from '../../utils/helper';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService<AllConfigType>,
    @InjectRepository(EmailCode)
    private emailCodeRepository: Repository<EmailCode>,
  ) {}

  async sendForgotPasswordMail(
    to: string,
    username: string,
    password: string,
  ): Promise<void> {
    return await this.mailerService.sendMail({
      to: to,
      subject: 'TrackingSystem: Reset Password ✔',
      template: 'forgot-password',
      context: {
        username: username,
        password: password,
        url: this.configService.get('app.backendDomain', { infer: true }),
      },
    });
  }

  async sendForgotUsernameMail(to: string, username: string): Promise<void> {
    return await this.mailerService.sendMail({
      to: to,
      subject: 'TrackingSystem: Find Username ✔',
      template: 'forgot-username',
      context: {
        username: username,
        url: this.configService.get('app.backendDomain', { infer: true }),
      },
    });
  }

  async sendCodeMail(to: string, code: string): Promise<void> {
    return await this.mailerService.sendMail({
      to: to,
      subject: 'TrackingSystem: Email verification ✔',
      template: 'email-confirm',
      context: {
        code: code,
      },
    });
  }

  async sendEmailCode(email: string): Promise<void> {
    const randomCode = randomStr(3).toUpperCase();
    await this.emailCodeRepository.save(
      this.emailCodeRepository.create({
        email: email,
        code: randomCode,
      }),
    );
    await this.sendCodeMail(email, randomCode);
  }

  async confirmEmailCode(code: string): Promise<string> {
    const result = await this.emailCodeRepository.findOne({
      where: {
        code: code,
        expireAt: MoreThan(moment().toDate()),
      },
    });
    if (!result) throw new CodeNotFoundException();

    return result.email;
  }
}
