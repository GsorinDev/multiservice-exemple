import { DynamicModule, Module } from '@nestjs/common';
import { ChienModule } from './chien/chien.module';
import { ChatModule } from './chat/chat.module';
import { ProxyModule } from './proxy/proxy.module';

@Module({})
export class AppModule {
  static forRoot(): DynamicModule {
    const modules = [];
    const serviceName = process.env.MICROSERVICE_NAME;

    if (serviceName === 'chat-service') {
      modules.push(ChatModule);
    } else if (serviceName === 'chien-service') {
      modules.push(ChienModule);
    } else if (serviceName === 'api-gateway') {
      modules.push(ProxyModule);
    }

    return {
      module: AppModule,
      imports: modules,
      controllers: [],
      providers: [],
    };
  }
}
