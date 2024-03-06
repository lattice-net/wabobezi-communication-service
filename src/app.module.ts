import { Module } from '@nestjs/common';
import { SmsModule } from './sms/sms.module';
import { MailingModule } from './mailing/mailing.module';

@Module({
  imports: [SmsModule, MailingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
