import { Controller, Get } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Controller('api/chien')
export class ChienController {
  logger: LoggerService = new LoggerService(ChienController.name);

  constructor() {
    this.logger.log('ChienController initialized');
  }

  @Get()
  getChienInfo() {
    this.logger.debug('ChienController {"info": "Info sur un chien"}');
    return { message: 'Informations sur les chiens' };
  }
}
