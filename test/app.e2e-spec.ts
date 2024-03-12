import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SmsModule } from '../src/sms/sms.module';
import { MailingModule } from '../src/mailing/mailing.module';

describe('MailingController, MessageController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async (): Promise<void> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MailingModule, SmsModule],
      providers:[]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return 200 OK', () => {
    return request(app.getHttpServer())
      .get('/mailing')
      .expect(404);
  });

  afterAll(async () : Promise<void> => {
    await app.close();
  });
});
