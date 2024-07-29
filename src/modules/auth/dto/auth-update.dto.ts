import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AuthUpdateDto {
  @ApiProperty({ example: `all` })
  @IsString()
  type?: string;

  @ApiProperty({ example: `tracking` })
  @IsOptional()
  password?: string;

  @ApiProperty({ example: `tracking` })
  @IsOptional()
  oldPassword?: string;

  @ApiProperty({ example: `0.0.123456` })
  @IsOptional()
  account?: string;

  @ApiProperty({ example: `accessKey` })
  @IsOptional()
  accessKey?: string;
}
