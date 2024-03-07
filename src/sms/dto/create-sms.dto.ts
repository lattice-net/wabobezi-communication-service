import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSmsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('TZ')
  phone: string;
}
