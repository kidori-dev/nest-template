import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

import moment from 'moment';

const Moment = moment();
export class UserCreateDto {
  @ApiProperty({ example: `tracking${Moment.format('mmss')}` })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], { message: 'usernameAlreadyExists' })
  @IsString()
  username: string;

  @ApiProperty({ example: `mail${Moment.format('mmss')}@tracking.com` })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], { message: 'emailAlreadyExists' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: `0.0.${Moment.format('HHmmss')}` })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], { message: 'accountAlreadyExists' })
  @IsString()
  account: string;

  @ApiProperty({ example: 'tracking' })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: `emailCode` })
  @IsNotEmpty()
  emailCode: string;

  @ApiProperty({ example: `TestPublicKey` })
  @IsNotEmpty()
  publicKey: string;

  @ApiProperty({ example: `accessKey` })
  @IsNotEmpty()
  accessKey: string;
}
