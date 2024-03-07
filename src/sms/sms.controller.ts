import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { SmsService } from './sms.service';
import { CreateSmsDto } from './dto/create-sms.dto';
import { ApiTags } from '@nestjs/swagger';
import { VerifyOtpPinSmsDto } from './dto/verify-otp-pin-sms.dto';

@ApiTags('SMS')
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post()
  sendSms(@Body() createSmsDto: CreateSmsDto) : Promise<object> {
    return this.smsService.create(createSmsDto);
  }

  @Post('request/otp')
  requestOTPPin(@Body() createSmsDto: CreateSmsDto): Promise<object> {
    return this.smsService.requestOTPPin(createSmsDto.phone)
  }

  @Post('verify/otp')
  verifyOTPPin(@Body() verifyOtpPinSmsDto: VerifyOtpPinSmsDto){
    return {}
  }
}
