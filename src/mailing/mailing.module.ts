import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { MailingController } from './mailing.controller';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'gsmtp',
        service: 'gmail',
        secure: false,
        auth: {
          user: 'justinjustin0797@gmail.com',
          pass: 'emsv xfor ojsa wowb',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: process.cwd() + '/src/mailing/mail-templates/',
        adapter: new HandlebarsAdapter(),
        options: { strict: true },
      },
    }),
  ],
  controllers: [MailingController],
  providers: [MailingService],
})
export class MailingModule {}
