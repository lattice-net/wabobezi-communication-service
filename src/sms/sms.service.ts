import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSmsDto } from './dto/create-sms.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SmsService {
  private readonly smsApiKey: string = process.env.BEEM_SMS_API_KEY;
  private readonly smsSecretKey: string = process.env.BEEM_SMS_SECRET_KEY;
  private readonly otpPinApiKey: string = process.env.BEEM_OTP_PIN_API_KEY;
  private readonly otpPinSecretKey: string = process.env.BEEM_OTP_PIN_SECRET_KEY;
  private readonly sourceAddr: string = process.env.BEEM_SOURCE_ADDRESS;
  private readonly applicationId: string = process.env.BEEM_OTP_PIN_APPLICATION_ID;
  private readonly contentType: string = 'application/json';

  constructor(private readonly prisma: PrismaService) {}

  async create(createSmDto: CreateSmsDto) {
    const recipients: { dest_addr: string; recipient_id: number }[] = [
      {
        recipient_id: 1,
        dest_addr: createSmDto.phone,
      },
    ];
    return await this.sendSms(
      recipients,
      'Hello your Account has been registered',
    );
  }

  async sendSms(recipients: object[], message: string): Promise<any> {
    return this.makeRequest(
      process.env.BEEM_SMS_URL,
      'POST',
      {
        source_addr: this.sourceAddr,
        schedule_time: '',
        encoding: 0,
        message,
        recipients,
      },
      this.smsApiKey,
      this.smsSecretKey,
    );
  }

  async requestOTPPin(msisdn: string): Promise<any> {
    const pinRequest = await this.makeRequest(
      process.env.BEEM_REQUEST_OTP_URL,
      'POST',
      {
        appId: this.applicationId,
        msisdn,
      },
      this.otpPinApiKey,
      this.otpPinSecretKey,
    );

    const create = await this.prisma.beemOTPPin.create({
      data: {
        PhoneNumber: msisdn,
        BeemPinId: pinRequest.data.pinId,
        BeemResponseJSON: pinRequest,
      },
    });
    return create ? pinRequest : undefined;
  }

  async verifyOTPPin(opt: string, phone: string): Promise<any> {
    const pinDetails = await this.prisma.beemOTPPin.findFirst({
      where: { PhoneNumber: phone },
      orderBy: { PinId: 'desc' },
    });
    const pinId: string | undefined = pinDetails?.BeemPinId;
    if (pinId === undefined) {
      throw new HttpException('Phone number does not', HttpStatus.NOT_FOUND);
    } else {
      return this.makeRequest(
        process.env.BEEM_OTP_VERIFY_PIN_URL,
        'POST',
        {
          pinId: pinId,
          pin: opt,
        },
        this.otpPinApiKey,
        this.otpPinSecretKey,
      );
    }
  }

  private async makeRequest(url: string, method: string, body: object, applicationApiKey: string, applicationSecretKey: string ): Promise<any> {
    try {
      const response: Response = await fetch(url, {
        method,
        headers: {
          'Content-Type': this.contentType,
          Authorization: `Basic ${btoa(
            `${applicationApiKey}:${applicationSecretKey}`,
          )}`,
        },
        body: JSON.stringify(body),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }
}
