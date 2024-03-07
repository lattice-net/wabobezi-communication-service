import { Test, TestingModule } from '@nestjs/testing';
import { MailingController } from './mailing.controller';
import { MailingService } from './mailing.service';
import { CreateMailingDto } from './dto/create-mailing.dto';

describe('MailingController', () => {
  let mailingController: MailingController;
  let mailingService: MailingService

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailingController],
      providers: [{
        provide: MailingService,
        useValue: {create: jest.fn((): boolean => true)}
      }],
    }).compile();

    mailingController = module.get<MailingController>(MailingController);
    mailingService = module.get<MailingService>(MailingService)
  });

  it('should call mailing service with correct arguments', async () => {
    const mailingDto: CreateMailingDto = new CreateMailingDto()

    await mailingController.create(mailingDto)
    expect(mailingService.create).toHaveBeenCalledWith(mailingDto)
    expect(mailingService.create).toHaveBeenCalledTimes(1)
  });
});
