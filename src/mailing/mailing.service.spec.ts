import { Test, TestingModule } from '@nestjs/testing';
import { MailingService } from './mailing.service';
import { CreateMailingDto } from './dto/create-mailing.dto';

describe('MailingService', () => {
  let mailerService: MailingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailingService],
    }).compile();

    mailerService = module.get<MailingService>(MailingService);
  });

  it('should be defined', () => {
    expect(mailerService).toBeDefined();
  });

  it('should call `sendMail` with correct parameters', async () => {
    const dto: CreateMailingDto = new CreateMailingDto();

    await mailerService.create(dto);
    const sendMailArgs: { template: string; subject: string; to: string } = {
      to: 'jessicakitali@gmail.com',
      subject: 'Welcome to Nice App!!! Confirm your Email',
      template: 'confirmation',
    };

    expect(mailerService.create).toHaveBeenCalledWith(sendMailArgs);
    expect(mailerService.create).toHaveBeenCalledTimes(1);
  });
});
