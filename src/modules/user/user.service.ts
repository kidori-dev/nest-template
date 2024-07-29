import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeepPartial, Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { User } from './entities/user.entity';
import { EntityCondition } from '../../utils/types/entity-condition.type';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { MailService } from '../mail/mail.service';
import { encryptSha256 } from '../../utils/helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  async findOne(fields: EntityCondition<User>): Promise<User | null> {
    return await this.userRepository.findOne({
      where: fields,
    });
  }

  async create(dto: UserCreateDto) {
    const hash = encryptSha256(randomStringGenerator());
    return await this.userRepository.save(
      this.userRepository.create({ ...dto, hash }),
    );
  }

  async update(id: User['id'], payload: DeepPartial<User>): Promise<User> {
    return await this.userRepository.save(
      this.userRepository.create({
        id,
        ...payload,
      }),
    );
  }
}
