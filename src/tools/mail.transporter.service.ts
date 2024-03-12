import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailTransporterService {
  private readonly mailTransporter : any;

  constructor() {
    this.mailTransporter = nodemailer.createTransport({
      host: 'smtp',
      service: 'gmail',
      secure: false,
      auth: {
        user: 'justinjustin0797@gmail.com',
        pass: 'emsv xfor ojsa wowb',
      },
    })
  }

  async verifyTransporter(): Promise<boolean> {
    return this.mailTransporter.verify()
  }
}