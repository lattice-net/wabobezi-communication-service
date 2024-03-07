import { Injectable } from '@nestjs/common';
import { CreateMailingDto } from './dto/create-mailing.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailingService {
  constructor(private mailerService: MailerService) {}
  async create(createMailingDto: CreateMailingDto): Promise<any> {
    console.log(createMailingDto);
    return await this.sendEmail(
      'justinmajura@gmail.com',
      'Welcome to Nice App!!! Confirm your Email',
      'confirmation',
    );
  }

  private async sendEmail(
    to: string,
    subject: string,
    template: string,
  ): Promise<any> {
    return await this.mailerService.sendMail({
      to: to,
      subject: subject,
      template: template,
    });
  }
}
