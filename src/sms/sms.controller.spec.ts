import { Test, TestingModule } from '@nestjs/testing';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';
import { PrismaService } from '../prisma/prisma.service';
import * as module from 'module';

describe('SmsController', () => {
  let smsController: SmsController;
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmsController],
      providers: [SmsService,PrismaService],
    }).compile();

    smsController = module.get<SmsController>(SmsController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(smsController).toBeDefined();
  });
});
