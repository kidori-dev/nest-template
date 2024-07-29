import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class AuthForgotUsernameDto {
  @ApiProperty({ example: `test3@greenplant.com` })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;
}
