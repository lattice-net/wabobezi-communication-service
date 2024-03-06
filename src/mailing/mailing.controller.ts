import { Controller, Get, Post, Body } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { CreateMailingDto } from './dto/create-mailing.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Email')
@Controller('mailing')
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

  @Post()
  create(@Body() createMailingDto: CreateMailingDto) {
    return this.mailingService.create(createMailingDto);
  }
}
