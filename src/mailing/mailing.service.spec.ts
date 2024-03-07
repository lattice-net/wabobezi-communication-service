import { Test, TestingModule } from '@nestjs/testing';
import { MailingService } from './mailing.service';
import { CreateMailingDto } from './dto/create-mailing.dto';
import { MailerService } from '@nestjs-modules/mailer';

describe('MailingService', () => {
  let mailingService: MailingService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailingService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn()
          }
        }
      ],
    }).compile();

    mailingService = module.get<MailingService>(MailingService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(mailingService).toBeDefined();
  });

  it('should call `sendMail` with correct parameters', async (): Promise<void> => {
    const dto: CreateMailingDto = new CreateMailingDto();

    await mailingService.create(dto);
    const sendMailArgs: { template: string; subject: string; to: string } = {
      to: 'justinmajura@gmail.com',
      subject: 'Welcome to Nice App!!! Confirm your Email',
      template: 'confirmation',
    };

    expect(mailerService.sendMail).toHaveBeenCalledWith(sendMailArgs);
    expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
  });
});
