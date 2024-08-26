import { Controller, Get, Param } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Controller('api/chat')
export class ChatController {
  logger: LoggerService = new LoggerService(ChatController.name);

  constructor() {
    this.logger.log('ChatController initialized');
  }

  @Get()
  getChatInfo() {
    this.logger.debug('ChatController {"info": "Info sur un chat"}');
    return { message: 'Informations sur les chats' };
  }

  @Get(':id')
  getChatOne(@Param('id') id: string) {
    this.logger.debug(`ChatController {"info": "Info sur le chat ${id}"}`);
    return { message: `Informations sur le chat ${id}` };
  }
}
