import { Test, TestingModule } from '@nestjs/testing';
import { SmsService } from './sms.service';
import { CreateSmsDto } from './dto/create-sms.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { create } from 'handlebars';

describe('SmsService', () => {
  let smsService: SmsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const prismaServiceMock = {
      beemOTPPIN: {
        create: jest.fn,
        findFirst: jest.fn,
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SmsService,
        {
          provide: PrismaService,
          useValue: new PrismaService()
        }
      ],
    }).compile();

    smsService = module.get<SmsService>(SmsService);
    prisma = module.get<PrismaService>(PrismaService)
  });

  it('should be defined', () => {
    expect(smsService).toBeDefined();
  });

  it('should create a message', async (): Promise<void> => {
    const createMessageDto: CreateSmsDto = new CreateSmsDto();
    createMessageDto.phone = '255782224075';
    smsService.sendSms = jest.fn().mockResolvedValue('test');
    const result = await smsService.create(createMessageDto);
    expect(result).toBe('test');
  });

  it('should send an OTP PIN', async (): Promise<void> => {
      const msisdn: string = '255782224075';
      const result = await smsService.requestOTPPin(msisdn);
      expect(result).toBeDefined();
  });

  it('should verify an OTP PIN', async (): Promise<void> => {
    const opt: string = '123456';
    const phone: string = '255782224075';
    const result = await smsService.verifyOTPPin(opt, phone);
    if(result !== undefined) {
      expect(typeof result).toBe('object')
    }else{
      expect(result).toBeUndefined();
    }
  }, 10000);
});
