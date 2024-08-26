import { Module } from '@nestjs/common';
import { ChienService } from './chien.service';
import { ChienController } from './chien.controller';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [ChienService],
  controllers: [ChienController],
})
export class ChienModule {}
