import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthConfirmPasswordDto {
  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  password: string;
}
