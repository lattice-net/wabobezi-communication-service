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
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/mailing')
      .send({
        email: 'justinmajura@gmail.com',
      })
      .expect(201)
      .expect('Content-Type', /json/);
  });

  it('/sms/verify/otp (POST)', () => {
    return request(app.getHttpServer())
      .post('/sms/verify-otp')
      .send({
        phone: '255782224075',
        pin: '312412',
      })
      .expect([201, 404])
      .expect('Content-Type', /json/);
  });

  it('/sms/request/otp (POST)', () => {
    return request(app.getHttpServer())
      .post('/message/request-otp')
      .send({
        phone: '255782224075',
      })
      .expect(201)
      .expect('Content-Type', /json/);
  });

  it('/sms/send (POST)', () => {
    return request(app.getHttpServer())
      .post('/message/send-sms')
      .send({
        phone: '255782224075',
      })
      .expect(201)
      .expect('Content-Type', /json/);
  });
});
