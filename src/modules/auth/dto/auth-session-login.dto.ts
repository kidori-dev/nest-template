import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { ErrorMessage } from '../../../constants/error-message';

export class AuthSessionLoginDto {
  @ApiProperty({ example: 'admin' })
  @Transform(lowerCaseTransformer)
  @Validate(IsExist, ['User'], {
    message: ErrorMessage[`UserNotFound`],
  })
  username: string;

  @ApiProperty({ example: '1234' })
  @IsNotEmpty()
  password: string;
}
