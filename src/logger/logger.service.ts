import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger {
  log(message: string) {
    super.log(message);
  }

  error(message: string, trace: string) {
    super.error(message, trace);
  }

  warn(message: string) {
    super.warn(message);
  }

  debug(message: string) {
    super.debug(message);
    // Ajoutez ici une logique personnalisée si nécessaire
  }

  verbose(message: string) {
    super.verbose(message);
  }
}
