import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class VerifyOtpPinSmsDto  {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('TZ')
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  otp: string;
}
